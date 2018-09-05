/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as tf from '@tensorflow/tfjs'
import * as tsne from '@tensorflow/tfjs-tsne'


/*
  ministのsplite画像を取得して
  canvasに描画し、データセットを取得
  train, testに分ける
*/
export const IMAGE_HEIGHT = 28
export const IMAGE_WIDTH = 28
export const IMAGE_SIZE = IMAGE_WIDTH * IMAGE_HEIGHT 
export const CLASSES = 10
export const DATASET_ELEMENTS = 65000
export const TRAIN_ELEMENTS = 550
//export const TRAIN_ELEMENTS = 55000
export const TEST_ELEMENTS = DATASET_ELEMENTS - TRAIN_ELEMENTS


const MNIST_IMAGES_SPRITE_PATH =
    'https://storage.googleapis.com/learnjs-data/model-builder/mnist_images.png'
const MNIST_LABELS_PATH =
'https://storage.googleapis.com/learnjs-data/model-builder/mnist_labels_uint8'


const chunkSize = 5000

export class MnistData {
  constructor(canvas) {
    this.shuffledTrainIndex = 0
    this.shuffledTestIndex = 0

    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.image = new Image()
  }

  async load() {
    console.log('loading...')

    const imgRequest = new Promise((resolve, reject) => {

      this.image.crossOrigin = ''

      this.image.onload = () => {
        this.image.width = this.image.naturalWidth
        this.image.height = this.image.naturalHeight

        // 全datasetのバイト長さ分の領域(画像数、高さ、幅、色)
        const datasetBytesBuffer = new ArrayBuffer(DATASET_ELEMENTS * IMAGE_SIZE * 4)

        this.canvas.width = this.image.width
        this.canvas.height = chunkSize 

        // batch size
        for (let i = 0; i < DATASET_ELEMENTS / chunkSize; i++) {
          // buffer [, byteOffset [, length]]
          const datasetBytesView = new Float32Array(
            datasetBytesBuffer,
            i * IMAGE_SIZE * chunkSize * 4,
            IMAGE_SIZE * chunkSize
          )

          this.context.drawImage(this.image, 0, i * chunkSize,
            this.image.width, chunkSize, 0, 0, this.image.width, chunkSize)

          // 表示した画像のデータを取得
          const imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)

          // gray scale image, read red channel
          // 全画素データを格納　1次元配列で長さは...画像の元の高さ*chunkSize/4
          for (let j = 0; j < imageData.data.length / 4; j++) {
            datasetBytesView[j] = imageData.data[j * 4] / 255
          }

        }
        this.datasetImages = new Float32Array(datasetBytesBuffer)

        resolve()
      }
      this.image.src = MNIST_IMAGES_SPRITE_PATH
    })

    // labelの読み込み
    const labelsRequest = fetch(MNIST_LABELS_PATH)

    console.log('requesting...')
    const [imageRes, labelRes] = await Promise.all([imgRequest, labelsRequest])
    console.log('get res...')

    this.datasetLabels = new Uint8Array(await labelRes.arrayBuffer())

    this.trainIndices = tf.util.createShuffledIndices(TRAIN_ELEMENTS)
    this.testIndices = tf.util.createShuffledIndices(TEST_ELEMENTS)

    // 任意の長さで切り取ることで、train testの画素情報を分ける
    this.trainImages = this.datasetImages.slice(0, IMAGE_SIZE * TRAIN_ELEMENTS)
    this.testImages = this.datasetImages.slice(IMAGE_SIZE * TRAIN_ELEMENTS)

    this.trainLabels = this.datasetLabels.slice(0, CLASSES * TRAIN_ELEMENTS)
    this.testLabels = this.datasetLabels.slice(CLASSES * TRAIN_ELEMENTS)

    console.log('set up data done')

  }

  nextTrainBatch(batchSize) {
    return this.nextBatch(
      batchSize,
      [this.trainImages, this.trainLabels],
      () => {
        this.shuffledTrainIndex = (this.shuffledTrainIndex+1) % this.trainIndices.length
        return this.trainIndices[this.shuffledTrainIndex]
      }
    )
  }

  nextTestBatch(batchSize) {
    return this.nextBatch(
      batchSize,
      [this.testImages, this.testLabels],
      () => {
        this.shuffledTestIndex = (this.shuffledTestIndex+1) % this.testIndices.length
        return this.testIndices[this.shuffledTestIndex]
      }
    )
  }

  nextBatch(batchSize, data, index) {
    const batchImagesArray = new Float32Array(batchSize * IMAGE_SIZE)
    const batchLabelsArray = new Uint8Array(batchSize * CLASSES)

    for (let i = 0; i < batchSize; i++) {
      const idx = index()

      const image = data[0].slice(idx*IMAGE_SIZE, idx*IMAGE_SIZE + IMAGE_SIZE)

      const label = data[1].slice(idx*CLASSES, idx*CLASSES + CLASSES)

      batchImagesArray.set(image, i*IMAGE_SIZE)
      batchLabelsArray.set(label, i*CLASSES)
    }

    const xs = tf.tensor2d(batchImagesArray, [batchSize, IMAGE_SIZE])
    const labels = tf.tensor2d(batchLabelsArray, [batchSize, CLASSES])

    return {xs, labels}
  }
}
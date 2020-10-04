import * as tf from '@tensorflow/tfjs'

//import { MnistData, IMAGE_HEIGHT, IMAGE_WIDTH, IMAGE_SIZE, CLASSES, TEST_ELEMENTS } from '../MnistTsne/data'
import { MnistData, IMAGE_HEIGHT, IMAGE_WIDTH, IMAGE_SIZE, CLASSES, TEST_ELEMENTS } from '../../utils/mnist/data'
import { valueAndGrad } from '@tensorflow/tfjs-core';

/*
https://github.com/tensorflow/tfjs-examples/blob/master/mnist/index.js
*/
export class MnistModel {
  constructor(canvas) {
    this.model = tf.sequential()
    this.learningRate = 0.15
    this.batchSize = 64
    this.trainBatch = 100
    this.testBatch = 1000
    this.testIterFreq = 5

    this.load(canvas) // load mnist data to this.data
  }

  async load(canvas) {
    this.data = new MnistData(canvas)
    await this.data.load()
  }

  initModel() {
    this.model.add(tf.layers.conv2d({
      inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, 1],
      kernelSize: 5,
      filters: 8,
      strides: 1,
      activation: 'relu',
      kernelInitializer: 'varianceScaling'
    }))

    this.model.add(tf.layers.conv2d({
      inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, 1],
      kernelSize: 5,
      filters: 16,
      strides: 1,
      activation: 'relu',
      kernelInitializer: 'varianceScaling'
    }))

    this.model.add(tf.layers.maxPooling2d({
      poolSize: [2, 2],
      strides: [2, 2]
    }))

    this.model.add(tf.layers.flatten())

    this.model.add(tf.layers.dense({
      units: 10,
      kernelInitializer: 'varianceScaling',
      activation: 'softmax'
    }))

    const optimizer = tf.train.sgd(this.learningRate)

    this.model.compile({
      optimizer: optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    })
  }


  async train() {
    const lossValues = []
    const accValues = []
    const data = this.data

    for (let i = 0; i < this.trainBatch; i++) {
      const [batch, validationData] = tf.tidy(() => {
        const batch = data.nextTrainBatch(this.batchSize)
        batch.xs = batch.xs.reshape([this.batchSize, IMAGE_WIDTH, IMAGE_HEIGHT, 1])

        let validationData

        // split test data each batch size
        if (i % this.testIterFreq === 0) {
          const testBatch = data.nextTestBatch(this.testBatch)
          // Reshape the training data from [64, 28x28] to [64, 28, 28, 1] so
          // that we can feed it to our convolutional neural net.
          validationData = [
            testBatch.xs.reshape([this.testBatch, IMAGE_WIDTH, IMAGE_HEIGHT, 1]),
            testBatch.labels
          ]
        }
        return [batch, validationData]
      })

      // The entire dataset doesn't fit into memory so we call train repeatedly
      // with batches using the fit() method.
      const history = await this.model.fit(
        batch.xs, batch.labels,
        {batchSize: this.batchSize, validationData, epochs: 1})

      const loss = history.history.loss[0]
      const accuracy = history.history.acc[0]

      // Plot loss / accuracy.
      // リアルタイムっぽく描きたい。。。
      lossValues.push({'batch': i, 'loss': loss, 'set': 'train'})

      if (validationData != null) {
        accValues.push({'batch': i, 'accuracy': accuracy, 'set': 'train'})
      }

      // Call dispose on the training/test tensors to free their GPU memory.
      tf.dispose([batch, validationData])

      // tf.nextFrame() returns a promise that resolves at the next call to
      // requestAnimationFrame(). By awaiting this promise we keep our model
      // training from blocking the main UI thread and freezing the browser.
      await tf.nextFrame()
    }

    let lastLoss = lossValues[lossValues.length - 1].loss.toFixed(2)
    let lastAcc = accValues[accValues.length - 1].accuracy.toFixed(2)

    console.log('train finish: ')
    console.log('loss: ', lastLoss)
    console.log('acc: ', lastAcc)

    return [lossValues, accValues]
  }

  async predict(testExamples=100) {
    const batch = this.data.nextTestBatch(testExamples)

    const [predictions, labels] = tf.tidy(() => {
      const output = this.model.predict(batch.xs.reshape([-1, IMAGE_WIDTH, IMAGE_HEIGHT, 1]))

      // tf.argMax() returns the indices of the maximum values in the tensor along
      // a specific axis. Categorical classification tasks like this one often
      // represent classes as one-hot vectors. One-hot vectors are 1D vectors with
      // one element for each output class. All values in the vector are 0
      // except for one, which has a value of 1 (e.g. [0, 0, 0, 1, 0]). The
      // output from model.predict() will be a probability distribution, so we use
      // argMax to get the index of the vector element that has the highest
      // probability. This is our prediction.
      // (e.g. argmax([0.07, 0.1, 0.03, 0.75, 0.05]) == 3)
      // dataSync() synchronously downloads the tf.tensor values from the GPU so
      // that we can use them in our normal CPU JavaScript code
      // (for a non-blocking version of this function, use data()).
      const axis = 1
      const labels = Array.from(batch.labels.argMax(axis).dataSync())
      const predictions = Array.from(output.argMax(axis).dataSync())

      console.log('predicts', predictions)
      console.log('labels', labels)
      return [predictions, labels]
    })
    return [batch, predictions, labels]
  }

  async mnist() {
    await this.load()
    await this.train()
    await this.predict()
  }

}

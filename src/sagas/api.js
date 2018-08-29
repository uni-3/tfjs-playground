import axios from 'axios'
import axiosBase from 'axios'


export const postBookApi = (formValue) => {
  let applicationId = process.env.REACT_APP_APP_ID
  let title = formValue.title || null // '猫'
  let author = formValue.author || null // '夏目漱石'
  let page = formValue.page
  let url = 'https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404'

  let params = {
    applicationId: applicationId,
    format: 'json',
    title: title,
    author: author,
    page: page
  }

  return axios.get(url, {
     params: params
  }).then((res) => {
    console.log('res axios', res)
    return res.request.response
  }).catch((err) => {
    return err
  })

}


export const postTextParseApi = (text, params) => {
  let url = process.env.REACT_APP_TEXT_API_URL

  let path = '/mecab/v1/text-parse'

  let body = {
    sentence: text
  }

  let ax = axiosBase.create({
    baseURL: url,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
  })


  return ax({
    method: 'post',
    url: path,
    data: body,
    params: params
  }).then((res) => {
    console.log('res axios', res)
    return res.data.results
  }).catch((err) => {
    return err
  })

}


export const postLexrankApi = (text, params) => {
  let url = process.env.REACT_APP_TEXT_API_URL

  // 'sentence1, sentence2'
  let sentences = text.replace(/\n/g, ', ')
  //let sentences = text
  let path = '/lexrank'

  let body = {
    sentences: sentences
  }

  let ax = axiosBase.create({
    baseURL: url,
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log('axios base', ax)

  return ax({
    method: 'post',
    url: path,
    data: body,
    params: params
  }).then((res) => {
    console.log('res axios', res)
    return res.data.results
  }).catch((err) => {
    return err
  })

}
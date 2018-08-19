import axios from 'axios'
 

export const postSearch = (formValue) => {
  let appId = process.env.REACT_APP_APP_ID
  let title = formValue.title || null // '猫'
  let author = formValue.author || null // '夏目漱石'
  let page = formValue.page
  let url = 'https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404'

  let params = {
    applicationId: appId,
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
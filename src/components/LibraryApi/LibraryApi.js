import React, { Component } from 'react'

import { Button, TextField } from "@material-ui/core"
import { Table, TableBody, TableHead, TableSortLabel, TableRow, TableCell, TablePagination, TableFooter } from "@material-ui/core"
import { Tooltip, CircularProgress } from "@material-ui/core"

export default class LibraryApi extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.libraryApi.page === 0) {
      return
    }
    // if change page(not 0), search
    if (nextProps.libraryApi.page !== this.props.libraryApi.page) {
      this.props.search()
    }
  }

  renderLoading(loading) {
    if (loading === false) {
      return
    }

    return (
      <CircularProgress size={50} />
    )
  }

  renderTableHeader() {
    console.log('head', this)
    const rows = [
      { id: 'title', numeric: false, disablePadding: true, label: 'タイトル' },
      { id: 'author', numeric: false, disablePadding: false, label: '著者' },
      { id: 'publisherName', numeric: false, disablePadding: false, label: '出版社' },
      { id: 'salesDate', numeric: false, disablePadding: false, label: '発売日' },
      { id: 'size', numeric: false, disablePadding: false, label: 'サイズ' },
      { id: 'url', numeric: false, disablePadding: false, label: 'リンク' },
    ]
    const { order, orderBy } = this.props.libraryApi
    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={() => {this.props.createSortHandler(row.id, order)}}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
      )
  }

  renderTableFooter(res) {
    let props = this.props.libraryApi

    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPage={30}
            page={props.page}
            count={res.count}
            onChangePage={this.props.onChangePage}
            rowsPerPageOptions={[]} // not display perpage select field
          >
          </TablePagination>
        </TableRow>
      </TableFooter>
    )
  }


  renderTable(res) {
    if (Object.keys(res).length === 0) {
      return
    }

    const resJson = JSON.parse(res)

    if (resJson.count === 0) {
      return
    }

    let {order, orderBy} = this.props.libraryApi
    let desc = (a, b, orderBy) => {
      if (b[orderBy] < a[orderBy]) {
        return -1
      }
      if (b[orderBy] > a[orderBy]) {
        return 1
      }
      return 0
    }

    let getSorting = (order, orderBy) => {
      console.log('sort', order, orderBy)
      return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
    }

    const count = resJson.count
    const items = resJson.Items
    const listItems = items.sort(getSorting(order, orderBy)).map((value, index) => {
    const item = value.Item
      return (
        <TableRow key={index}>
          <TableCell>{item.title}</TableCell>
          <TableCell>{item.author}</TableCell>
          <TableCell>{item.publisherName}</TableCell>
          <TableCell>{item.salesDate}</TableCell>
          <TableCell>{item.size}</TableCell>
          <TableCell>{item.itemUrl}</TableCell>
        </TableRow>
      )
    })

    return (
      <div> 
        hits: {count}
        <Table>
          {this.renderTableHeader()}
          <TableBody>
            {listItems}
          </TableBody>
          {this.renderTableFooter(resJson)}
        </Table>
      </div>
    )
  }


  render() {
    console.log('library this props', this.props)
    const { onSearch, changedForm } = this.props
    const { title, author, res, loading } = this.props.libraryApi
    console.log('loading', loading)
    return(
      <div>
        <h2>Book api</h2>
        <form onSubmit={onSearch}>
          <TextField name="title" label="Title" value={title} onChange={changedForm} />
          <TextField name="author" label="Author" value={author} onChange={changedForm} />
          <Button type="submit" variant="outlined" color="primary">search</Button>
        </form>
        { this.renderLoading(loading)}
        { this.renderTable(res) }
      </div>
    )
  }
}
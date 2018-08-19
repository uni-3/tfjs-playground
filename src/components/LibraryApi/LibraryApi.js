import React, { Component } from 'react'

import { Button, TextField } from "@material-ui/core"
import { Table, TableBody, TableHead, TableRow, TableCell } from "@material-ui/core"
import { Tooltip } from "@material-ui/core"

export default class LibraryApi extends Component {
  constructor(props) {
    super(props)
  }

  /*
  renderTableHead() {
    const rows = [
      { id: 'title', numeric: false, disablePadding: true, label: 'タイトル' },
      { id: 'author', numeric: false, disablePadding: false, label: '著者' },
      { id: 'publisherName', numeric: false, disablePadding: false, label: '出版社' },
      { id: 'salesDate', numeric: false, disablePadding: false, label: '発売日' },
      { id: 'size', numeric: false, disablePadding: false, label: 'サイズ' },
      { id: 'url', numeric: false, disablePadding: false, label: 'リンク' },
    ]
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
                      onClick={this.createSortHandler(row.id)}
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
  */

  renderResTable(res) {
    if (Object.keys(res).length === 0) {
      return
    }

    const resJson = JSON.parse(res)
    const count = resJson.count
    const items = resJson.Items
    const listItems = items.map((value, index) => {
      const item = value.Item

      return (
        <TableRow
          key={index}
        >
          <TableCell>
            {item.title}
          </TableCell>
          <TableCell>
            {item.author}
          </TableCell>
          <TableCell>
            {item.publisherName}
          </TableCell>
          <TableCell>
            {item.salesDate}
          </TableCell>
          <TableCell>
            {item.size}
          </TableCell>
          <TableCell>
            {item.itemUrl}
          </TableCell>
        </TableRow>
      )
    })

    return (

      <div> 
        hits: {count}
        <Table>
          <TableBody>
            {listItems}
          </TableBody>
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
        <h2>library api</h2>
        <form onSubmit={onSearch}>
          <TextField name="title" label="Title" value={title} onChange={changedForm} />
          <TextField name="author" label="Author" value={author} onChange={changedForm} />
          <Button type="submit" variant="outlined" color="primary">search</Button>
        </form>
        { this.renderResTable(res) }
      </div>
    )
  }
}
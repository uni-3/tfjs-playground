import React, { Component } from 'react'
import { 
  ReactiveBase, CategorySearch, SingleRange, ResultCard, ReactiveList 
} from '@appbaseio/reactivesearch'


import { Button, TextField } from "@material-ui/core"
import { Table, TableBody, TableHead, TableSortLabel, TableRow, TableCell, TablePagination, TableFooter } from "@material-ui/core"
import { Tooltip, CircularProgress } from "@material-ui/core"

import "./Wikiart.css"

const ReactiveHeader = () => {
    const rows = [
      { id: 'image', numeric: false, disablePadding: false, label: '画像' },
      { id: 'artistName', numeric: false, disablePadding: true, label: 'アーティスト名' },
      { id: 'title', numeric: false, disablePadding: false, label: '作品名' },
      { id: 'genre', numeric: false, disablePadding: false, label: 'ジャンル' },
      { id: 'style', numeric: false, disablePadding: false, label: 'スタイル' },
      { id: 'description', numeric: false, disablePadding: false, label: '説明文' },
      { id: 'completitionYear', numeric: false, disablePadding: false, label: '完成年' }
    ]
    //const { order, orderBy } = this.props.libraryApi
    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                //sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                   // active={orderBy === row.id}
                   // direction={order}
                  //  onClick={() => {this.props.createSortHandler(row.id, order)}}
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

const ReactiveFooter = (row) => {
    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPage={30}
            //page={props.page}
            //count={res.count}
            //onChangePage={this.props.onChangePage}
            rowsPerPageOptions={[]} // not display perpage select field
          >
          </TablePagination>
        </TableRow>
      </TableFooter>
    )
}

const ReactiveRow = ({rows}) => {
  const listItems = rows.map(item => (
        <TableRow key={item._id}>
          <TableCell><img className="artimg" src={item.image} /></TableCell>
          <TableCell>{item.artistName}</TableCell>
          <TableCell>{item.title}</TableCell>
          <TableCell>{item.genre}</TableCell>
          <TableCell>{item.style}</TableCell>
          <TableCell>{item.description}</TableCell>
          <TableCell>{item.completitionYear}</TableCell>
        </TableRow>
      )
  )

  return (
    <Table>
      <ReactiveHeader />
      <TableBody>
        {listItems}
      </TableBody>
      {/*-
      <ReactiveFooter />
      */}
    </Table>

  )

}

const ItemList = () => {
  return (
    <ReactiveList
      componentId="result"
      title="Results"
      dataField="title"
      from={0}
      size={5}
      pagination={true}
      react={{
        and: ["description", "artistName", "serachbox"]
      }}
      render={({ data }) => (
        <ReactiveRow
          rows={data}
        />
      )}
    />
  )
}

export const Wikiart = () => {
  return (
    <ReactiveBase
      app="wikiart"
      url="https://qd0mxz2unw:q6yjhx7ttz@aralia-841597431.us-east-1.bonsaisearch.net:443"
      className="wikiart"
    >
      <ItemList />
    </ReactiveBase>
  )
}

export default Wikiart
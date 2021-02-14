import React, { useState } from 'react'
import "../Styles/Table.css"
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import '../Styles/Modal.css';
import ModalInfo from './ModalInfo';


const Table = ({update, onPush}) => {

  const [modalIsOpen, setmodalIsOpen] = useState(false)
  const [modalInfo, setmodalInfo] = useState({
    id: "",
    artists: "",
    name: "",
    duration: "",
    date: "",
    imageurl: "",
    link: "",
    type: "",
  })

  const closeModal = () => {
    setmodalIsOpen(false)
  }

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      show: false,
    },

    {
      Header: "Song",
      accessor: "Song",
      sortable: false,
      style: {
        textAlign: "center"
      }
    },
    {
      Header: "Artists",
      accessor: "Artists",
      sortable: false,
      style: {
        textAlign: "center"
      }
    },
    {
      Header: "Duration",
      accessor: "Duration",
      style: {
        textAlign: "center"
      }
    },
    {
      Header: "Date Added",
      accessor: "date",
      style: {
        textAlign: "center"
      }
    },
    {
      Header: "Image",
      accessor: "imageURL",
      show: false,
      style: {
        textAlign: "center"
      }
    },
    {
      Header: "Link",
      accessor: "link",
      show: false,
      style: {
        textAlign: "center"
      }
    },
    {
      Header: "Type",
      accessor: "type",
      show: false,
      style: {
        textAlign: "center"
      }
    },
    {
      Header: "Actions",
      Cell: props => {
        return (
          <li className="actions">
            <button className="view-but" onClick={() => {
              setmodalIsOpen(true);
              setmodalInfo({
                id: props.original.id, 
                artists: props.original.Artists, 
                name: props.original.Song, 
                duration: props.original.Duration, 
                date: props.original.date, 
                imageurl: props.original.imageUrl,
                link: props.original.link,
                type: props.original.type,
              })
            }}>View</button>
            <button className="delete-but" onClick={() => {onPush(props.original.id)}}>Delete</button>
          </li>
        )
      },
      style: {
        textAlign: "center"
      }
    }
  ];

  return (
    <div className="table">
      <br />
      <ReactTable
        columns={columns}
        style={{
          height: "400px",
        }}
        data={update}
        defaultPageSize={10}
        noDataText={"Nothing to show..."}
      />
      <ModalInfo modalinfo={modalInfo} open={modalIsOpen} close={closeModal} />
    </div>
  );
}

export default Table;


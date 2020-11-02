import React from "react";
import Table from "react-bootstrap/Table";
import { Parent, Pro } from "../../views/Users/types";

interface UsersTableTypes {
  tableHeaders: string[];
  tableBody: Array<Pro | Parent>;
  onDelete: (id: string) => void;
}

const UsersTable: React.FC<UsersTableTypes> = ({
  tableHeaders,
  tableBody,
  onDelete,
}) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          {tableHeaders.map((value, index) => {
            return <th key={index}>{value}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {tableBody.map((user: Pro | Parent) => {
          const row = [];
          for (const key in user) {
            row.push(<td>{user[key]}</td>);
          }
          row.push(
            <td>
              <button
                onClick={() => {
                  onDelete(user.idUser);
                }}
              >
                Supprimer
              </button>
            </td>
          );
          return <tr>{row}</tr>;
        })}
      </tbody>
    </Table>
  );
};

export default UsersTable;

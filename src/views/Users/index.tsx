import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import UsersTable from "../../components/UsersTable";
import { Pro, Parent } from "./types";
import "./styles.scss";

const Users: React.FC = () => {
  const [selected, setSelected] = useState<"Pros" | "Parents">("Pros");
  const [offset] = useState<number>(0);
  const [limit] = useState<number>(20);
  const [pros, setPros] = useState<Array<Pro> | undefined>();
  const [parents, setParents] = useState<Array<Parent> | undefined>();

  useEffect(() => {
    fetchUsers(selected, offset, limit);
  }, [selected]);

  const fetchUsers = async (
    type: string,
    offset: number,
    limit: number
  ): Promise<void> => {
    const axiosResponse: AxiosResponse = await axios.get(
      `/admin/get${type}?offset=${offset}&limit=${limit}`
    );
    const users = axiosResponse.data;
    if (selected === "Pros") {
      const prosFormatted: Array<Pro> = users.map((user: any) => {
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          premiumLevel: user.premiumLevel,
          idUser: user.idUser,
        } as Pro;
      });
      setPros(prosFormatted);
    } else {
      const parentFormatted: Array<Parent> = users.map((user: any) => {
        return {
          _id: user._id,
          lastname: user.lastname,
          firstname: user.firstname,
          numberOfChildren: user.children.length,
          idUser: user.idUser,
        } as Parent;
      });
      setParents(parentFormatted);
    }
  };

  const handleDelete = async (id: string) => {
    switch (selected) {
      case "Parents":
        if (!parents || !parents.length) {
          break;
        }
        await axios.delete(`/users/${id}`);
        const filteredOutParents = parents.filter(
          (element) => element.idUser !== id
        );
        setParents(filteredOutParents);

        break;

      case "Pros":
        if (!pros || !pros.length) {
          break;
        }
        await axios.delete(`/users/${id}`);
        const filteredOutPros = pros.filter((element) => element.idUser !== id);
        setPros(filteredOutPros);
        break;

      default:
        break;
    }
  };

  return (
    <div className="users">
      <div className="userSelect">
        <span
          onClick={() => setSelected("Pros")}
          className={`span-left ${
            selected !== "Pros" ? "span-underlined" : ""
          }`}
        >
          Pros
        </span>
        <span
          onClick={() => setSelected("Parents")}
          className={selected !== "Parents" ? "span-underlined" : ""}
        >
          Parents
        </span>
      </div>
      <div className="table-wrapper">
        {selected === "Parents" && parents ? (
          <UsersTable
            tableBody={parents}
            tableHeaders={Object.keys(parents[0])}
            onDelete={handleDelete}
          />
        ) : null}
        {selected === "Pros" && pros ? (
          <UsersTable
            tableBody={pros}
            onDelete={handleDelete}
            tableHeaders={Object.keys(pros[0])}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Users;

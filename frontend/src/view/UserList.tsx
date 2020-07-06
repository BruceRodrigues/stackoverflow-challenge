import { AxiosError, AxiosResponse } from "axios";
import { Cell, Grid } from "bold-ui";
import React, { useEffect, useState } from "react";
import UserCard from "../component/UserCard";
import { API } from "../config";
import {
  StackOverflowPageUser,
  StackOverflowUser,
} from "../model/StackOverflowUser";

export default () => {
  const [usersList, setUsersList] = useState<StackOverflowPageUser>();

  useEffect(() => {
    API.get<StackOverflowPageUser>("/stackoverflowusers")
      .then((res: AxiosResponse<StackOverflowPageUser>) =>
        setUsersList(res.data)
      )
      .catch((err: AxiosError) => console.log(err));
  }, []);

  return (
    <Grid>
      {usersList?.items.map((user: StackOverflowUser) => (
        <Cell xs={2}>
          <UserCard
            display_name={user.display_name}
            location={user.location}
            user_id={user.user_id}
          />
        </Cell>
      ))}
    </Grid>
  );
};

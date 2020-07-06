import { Text, VFlow } from "bold-ui";
import React from "react";
import { StackOverflowUser } from "../model/StackOverflowUser";

export interface UserCardProps {
  display_name: string;
  location: string;
}

export default (props: StackOverflowUser) => (
  <VFlow>
    <Text>{props.display_name}</Text>
    <Text>{props.location}</Text>
  </VFlow>
);

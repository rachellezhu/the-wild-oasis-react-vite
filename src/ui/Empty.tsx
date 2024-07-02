import React from "react";

type EmptyProps = {
  resource: string;
};

export default function Empty({ resource }: EmptyProps): React.ReactElement {
  return <p>No {resource} could be found</p>;
}

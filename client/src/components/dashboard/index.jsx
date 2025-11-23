/**
 * Internal dependencies.
 */
import { Heading } from "../heading";
import { InputBox } from "../InputBox";
import { Table } from "../tables";

export const Dashboard = () => {
  return (
    <div>
      <Heading heading="Aganitha URL Shortener" />
      <InputBox />
      <Table />
    </div>
  );
};

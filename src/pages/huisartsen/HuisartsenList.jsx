import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getAll, deleteById } from "../../api";
import AsyncData from "../../components/AsyncData";
import HuisartsenTable from "../../components/huisartsen/HuisartsenTable";
import "../../index.css";

export default function HuisartsenList() {
  const {
    data: huisartsen = [],
    error,
    isLoading,
  } = useSWR("huisartsen", getAll);
  const { trigger: deleteHuisarts, error: deleteError } = useSWRMutation(
    "huisarts",
    deleteById
  );

  return (
    <div className="page-container">
      <h1>Huisartsen</h1>

      <AsyncData loading={isLoading} error={error || deleteError}>
        <HuisartsenTable huisartsen={huisartsen} onDelete={deleteHuisarts} />
      </AsyncData>
    </div>
  );
}

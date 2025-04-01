import useSWR from "swr";
import { useCallback } from "react";
import useSWRMutation from "swr/mutation";
import { getAll, deleteById } from "../../api";
import AsyncData from "../../components/AsyncData";
import LedenTable from "../../components/leden/LedenTable";
import "../../index.css";

export default function LedenList() {
  const { data: leden = [], error, isLoading } = useSWR("leden", getAll);
  const { trigger: deleteLid, error: deleteError } = useSWRMutation(
    "leden",
    deleteById
  );

  return (
    <div className="page-container">
      <h1>Leden</h1>

      <AsyncData loading={isLoading} error={error || deleteError}>
        <LedenTable leden={leden} onDelete={deleteLid} />
      </AsyncData>
    </div>
  );
}

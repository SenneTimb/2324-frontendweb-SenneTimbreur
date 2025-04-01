import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getAll, deleteById } from "../../api";
import AsyncData from "../../components/AsyncData";
import OudersTable from "../../components/ouders/OudersTable";

export default function OudersList() {
  const { data: ouders = [], error, isLoading } = useSWR("ouders", getAll);
  const { trigger: deleteOuder, error: deleteError } = useSWRMutation(
    "ouders",
    deleteById
  );

  return (
    <>
      <h1>Ouders</h1>

      <AsyncData loading={isLoading} error={error || deleteError}>
        <OudersTable ouders={ouders} onDelete={deleteOuder} />
      </AsyncData>
    </>
  );
}

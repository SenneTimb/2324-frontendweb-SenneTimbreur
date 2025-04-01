import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getById, getAll } from "../../api";
import LedenForm from "../../components/leden/LedenForm";
import AsyncData from "../../components/AsyncData";

export default function VoegLidToe() {
  const { id } = useParams();

  const {
    data: lid,
    error: lidError,
    isLoading: lidLoading,
  } = useSWR(id ? `leden/${id}` : null, getById);

  const {
    data: ouders = [],
    error: oudersError,
    isLoading: oudersLoading,
  } = useSWR("ouders", getAll);

  const {
    data: huisartsen = [],
    error: huisartsenError,
    isLoading: huisartsenLoading,
  } = useSWR("huisartsen", getAll);

  return (
    <>
      <AsyncData
        error={lidError || oudersError || huisartsenError}
        loading={lidLoading || oudersLoading || huisartsenLoading}
      >
        <LedenForm huisartsen={huisartsen} ouders={ouders} lid={lid} />
      </AsyncData>
    </>
  );
}

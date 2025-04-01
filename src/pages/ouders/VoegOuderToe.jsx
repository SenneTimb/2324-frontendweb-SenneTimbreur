import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getById, getAll } from "../../api";
import OudersForm from "../../components/ouders/OudersForm";
import AsyncData from "../../components/AsyncData";

export default function VoegLidToe() {
  const { id } = useParams();

  const {
    data: ouder,
    error: ouderError,
    isLoading: ouderLoading,
  } = useSWR(id ? `ouders/${id}` : null, getById);

  return (
    <>
      <AsyncData error={ouderError} loading={ouderLoading}>
        <OudersForm ouder={ouder} />
      </AsyncData>
    </>
  );
}

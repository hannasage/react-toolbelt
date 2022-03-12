import { useEndpoint } from "../hooks/UseEndpoint";
import { useEffect, useState } from "react";
import { SampleApi, SampleObject } from "../api/SampleApi";

function NetworkDemo() {
    const [id, setId] = useState<number>(123);
    const { call, response } = useEndpoint<SampleObject>(
        SampleApi.getSampleItem(id)
    );

    useEffect(() => {
        call();
    }, [id]);

    return (
        <div title="container">
            <span>{response.data?.num || `Status: ${response.status}`}</span>
            <button title="update-button" onClick={() => setId(id + 1)}>
                New ID
            </button>
        </div>
    );
}

export default NetworkDemo;

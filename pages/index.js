import { useState, useEffect } from "react";

export default function Home() {
    const [showcaseEntryIds, setShowcaseEntryIds] = useState([]);

    useEffect(() => {
        const fetchShowcaseEntryIds = async () => {
            let response;

            try {
                response = await fetch(
                    "https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryIds"
                );
                const data = response.json();
                console.log(data);
                setShowcaseEntryIds(data);
            } catch (error) {}
        };

        fetchShowcaseEntryIds();
    });

    return <div>index</div>;
}

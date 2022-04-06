import { useState, useEffect } from "react";

export const getStaticProps = async () => {
    const res = await fetch(
        "https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryIds"
    );
    const data = await res.json();

    const entryIdArr = [];

    for (let i = 0; i < data.length; i++) {
        try {
            let entryIdRes = await fetch(
                `https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryById?id=${data[i]}`
            );
            let entryIdData = await entryIdRes.json();
            entryIdArr.push(entryIdData);
        } catch (error) {}
    }

    return { props: { entryIds: data, entryIdArr: entryIdArr } };
};

export default function Home({ entryIds, entryIdArr }) {
    const [showcaseEntryIds, setShowcaseEntryIds] = useState([]);

    useEffect(() => {
        setShowcaseEntryIds(entryIds);
        console.log(entryIdArr);
    });

    return (
        <div className="page-container">
            {showcaseEntryIds.length !== 0 && (
                <div>
                    Entry Ids
                    <div className="entryIds-container">
                        {showcaseEntryIds.map((id, index) => {
                            return (
                                <div className="entryId" key={index}>
                                    {id}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

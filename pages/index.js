import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Image from "next/image";

import styles from "../styles/Home.module.css";

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

    return { props: { entryIdArr: entryIdArr } };
};

export default function Home({ entryIdArr }) {
    const [showcaseEntryIdsArr, setShowcaseEntryIdsArr] = useState([]);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [perPage, setPerPage] = useState(9);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        setShowcaseEntryIdsArr(entryIdArr);
        setIsLoading(false);
        setPages(Math.floor(entryIdArr.length / perPage));
        setItems(entryIdArr.slice(page * perPage, (page + 1) * perPage));
    }, [entryIdArr, page, perPage]);

    const handlePageClick = (event) => {
        let newPage = event.selected;
        setPage(newPage);
        setItems(entryIdArr.slice(newPage * perPage, (newPage + 1) * perPage));
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.linkContainer}>
                <div className={styles.codeLink}>
                    <a
                        href="https://github.com/danielalexvega/bc-takehome"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Check out the code
                    </a>
                </div>
            </div>
            <h1 className={styles.pageContainerTitle}>BigCommerce Clients</h1>

            {!isLoading && (
                <>
                    <div className={styles.paginationContainer}>
                        <ReactPaginate
                            previousLabel={"<<"}
                            nextLabel={">>"}
                            pageCount={pages}
                            onPageChange={handlePageClick}
                            activeClassName={"active"}
                        />
                    </div>
                    <div className={styles.showcaseContainer}>
                        {items.map((showcase, index) => {
                            return (
                                <div
                                    className={styles.showcaseCard}
                                    key={index}
                                >
                                    <a
                                        className={styles.showcaseCardLink}
                                        href={showcase.url.value}
                                        target={showcase.url.target}
                                        rel="noreferrer"
                                    >
                                        <div
                                            className={styles.showcaseCardTitle}
                                        >
                                            <h2>{showcase.title}</h2>
                                        </div>
                                        <div
                                            className={
                                                styles.showcaseImageContainer
                                            }
                                        >
                                            <Image
                                                className={styles.showcaseImage}
                                                src={showcase.image.url}
                                                alt={showcase.image.title}
                                            />
                                        </div>
                                        <div>{showcase.description}</div>
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.paginationContainer}>
                        <ReactPaginate
                            previousLabel={"<<"}
                            nextLabel={">>"}
                            pageCount={pages}
                            onPageChange={handlePageClick}
                            activeClassName={"active"}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

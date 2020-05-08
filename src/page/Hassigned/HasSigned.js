import "./hassigned.scss";
import React, { useEffect, useState } from "react";
import { Button, Skeleton } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const HasSigned = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {}, []);
  return (
    <div className="hasSigned">
      <Document
        loading={<Loading />}
        className="hasSigned-pdf"
        file={getUrlParam("url")}
        onLoadSuccess={onDocumentLoadSuccess}
        options={{
          // cMapUrl: "cmaps/",
          cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/cmaps/",
          cMapPacked: true
        }}
      >
        <Page pageNumber={pageNumber} />
        <p className="text">
          {pageNumber > 1 && (
            <Button
              onClick={() => {
                setPageNumber(pageNumber - 1);
                window.scrollTo({
                  left: 0,
                  top: 0,
                  behavior: "smooth"
                });
              }}
            >
              上一页
            </Button>
          )}
          当前第{pageNumber}页，共{numPages}页
          {pageNumber < numPages && (
            <Button
              onClick={() => {
                setPageNumber(pageNumber + 1);
                window.scrollTo({
                  left: 0,
                  top: 0,
                  behavior: "smooth"
                });
              }}
            >
              下一页{" "}
            </Button>
          )}
        </p>
      </Document>
    </div>
  );
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
};

export default HasSigned;

function getUrlParam(parameter) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(parameter);
}

const Loading = () => {
  return (
    <div>
      <Skeleton className="all" active />
      <Skeleton className="all" active />
      <Skeleton className="all" active />
      <Skeleton className="all" active />
      <Skeleton className="all" active />
    </div>
  );
};

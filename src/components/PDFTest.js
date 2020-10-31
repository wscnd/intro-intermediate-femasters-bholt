import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.parcel";
import { css } from "@emotion/core";

import samplePDF from "~/components/a.pdf";
import Spinner from "./Spinner";
import colors from "~/pages/style";

export default function Test() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div css={elm}>
      <Document file={samplePDF} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          loading={<Spinner size={50} color={colors.primary} />}
        >
          <div className="page-controls">
            <button
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(pageNumber - 1)}
              type="button"
              aria-label="Previous page"
            >
              ‹
            </button>
            <span>
              <label>
                <input
                  type="text"
                  id="location"
                  value={pageNumber}
                  placeholder="PAGE"
                  onChange={(e) => console.log(e)}
                />
              </label>{" "}
              of {numPages}
            </span>
            <button
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber(pageNumber + 1)}
              type="button"
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </Page>
      </Document>
    </div>
  );
}

const elm = css`
  .react-pdf__Page__canvas {
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, 0%) !important;
  }

  .react-pdf__Page__textContent {
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, 0%) !important;
  }

  .react-pdf__Document {
    position: relative;

    &:hover {
      .page-controls {
        opacity: 1;
      }
    }
  }

  .page-controls {
    position: absolute;
    bottom: 90%;
    left: 50%;
    background: white;
    opacity: 1;
    transform: translateX(-50%);
    transition: opacity ease-in-out 0.2s;

    span {
      font: inherit;
      font-size: 0.8em;
      padding: 0 0.5em;
    }

    button {
      width: 44px;
      height: 44px;
      background: white;
      border: 0;
      font: inherit;
      font-size: 1.5em;

      &:enabled {
        &:hover {
          cursor: pointer;
        }

        &:hover,
        &:focus {
          background-color: #ebebe4;
        }
      }

      &:disabled {
        &:hover {
          cursor: no-drop;
        }
        font-size: 1.5em;
        color: #ebebe4;
      }

      &:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      &:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
  }
`;

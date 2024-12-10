"use client";

import { insertionSort, insertionSortFull } from "./components/insertionSort";
import { selectionSort, selectionSortFull } from "./components/selectionSort";
import { useState, useEffect } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function Home() {
  const [colors, setColors] = useState(randomColorList());
  const [data, setData] = useState({});

  const [insertionResults, setInsertionResults] = useState([]);
  const [insertionComparisons, setinsertionComparisons] = useState(0);
  const [insertionSwaps, setinsertionSwaps] = useState(0);
  const [insertionSortList, setInsertionSortList] = useState([
    ...Object.values(data),
  ]);

  const [selectionResults, setSelectionResults] = useState([]);
  const [selectionComparisons, setselectionComparisons] = useState(0);
  const [selectionSwaps, setselectionSwaps] = useState(0);
  const [selectionSortList, setSelectionSortList] = useState([
    ...Object.values(data),
  ]);

  useEffect(() => {
    fetchData("dogNames");
  }, []);

  async function fetchData(data) {
    const res = await fetch("http://localhost:3000/" + data + ".json");
    const jsonData = await res.json();
    setData(jsonData);
  }

  function makeActiveDataButton(button) {
    document.getElementById("dogNames").classList.remove("active");
    document.getElementById("schoolMembers").classList.remove("active");
    document.getElementById("meteorMasses").classList.remove("active");

    document.getElementById(button).classList.add("active");
  }

  function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1 + min));
  }

  function randomRGB() {
    return `rgb(${randint(100, 200)}, ${randint(100, 255)}, ${randint(
      100,
      255
    )})`;
  }

  function randomColorList() {
    let colors = [];
    for (let i = 0; i < 5000; i++) {
      colors.push(randomRGB());
    }
    return colors;
  }

  function insertionStep() {
    if (insertionResults.length == 0) {
      // insertionResults hasn't been defined yet, need to run insertionSort
      setInsertionResults(insertionSort(Object.values(data), []));
      document.getElementById("insertionButton").innerHTML =
        "Run One Insertion Sort Step";
      return;
    }

    // we now have insertionResults

    if (insertionResults[0].length > 1) {
      let copyInsertionResults = [...insertionResults];
      copyInsertionResults = copyInsertionResults.slice(1);
      //console.log(copyInsertionResults)
      setInsertionResults(copyInsertionResults);
      setinsertionComparisons(
        insertionComparisons + copyInsertionResults[0][1]["comparisons"]
      );
      setinsertionSwaps(insertionSwaps + copyInsertionResults[0][1]["swaps"]);
      document.getElementById("resultsShower").innerHTML =
        "Comparisons: " + insertionComparisons + "<br>Swaps: " + insertionSwaps;
    }
    setInsertionSortList(insertionResults[0][0]);
  }

  function insertionFull() {
    // we now have insertionResults

    setInsertionResults(insertionSortFull(Object.values(data)));
    setInsertionSortList(insertionResults[0]);
    console.log(insertionResults);
    setinsertionComparisons(insertionResults[1]["comparisons"]);
    setinsertionSwaps(insertionResults[1]["swaps"]);
    document.getElementById("resultsShower").innerHTML =
      "Comparisons: " + insertionComparisons + "<br>Swaps: " + insertionSwaps;
  }

  function selectionStep() {
    if (selectionResults.length == 0) {
      // insertionResults hasn't been defined yet, need to run insertionSort
      setSelectionResults(selectionSort(Object.values(data), []));
      document.getElementById("selectionButton").innerHTML =
        "Run One Selection Sort Step";
      return;
    }

    // we now have insertionResults

    if (selectionResults[0].length > 1) {
      let copySelectionResults = [...selectionResults];
      copySelectionResults = copySelectionResults.slice(1);
      console.log(copySelectionResults);
      setSelectionResults(copySelectionResults);
      setselectionComparisons(
        selectionComparisons + copySelectionResults[0][1]["comparisons"]
      );
      setselectionSwaps(selectionSwaps + copySelectionResults[0][1]["swaps"]);
      document.getElementById("resultsShowerSelection").innerHTML =
        "Comparisons: " + selectionComparisons + "<br>Swaps: " + selectionSwaps;
    }
    setSelectionSortList(selectionResults[0][0]);
  }

  function selectionFull() {
    // we now have insertionResults

    setSelectionResults(selectionSortFull(Object.values(data)));
    setSelectionSortList(selectionResults[0]);
    console.log(selectionResults);
    setselectionComparisons(selectionResults[1]["comparisons"]);
    setselectionSwaps(selectionResults[1]["swaps"]);
    document.getElementById("resultsShowerSelection").innerHTML =
      "Comparisons: " + selectionComparisons + "<br>Swaps: " + selectionSwaps;
  }

  return (
    <>
      <div className="m-5 text-center flex justify-evenly z-10">
        <button
          id="dogNames"
          className="border-black border-2 bg-teal-400 active"
          onClick={() => {
            makeActiveDataButton("dogNames");
            fetchData("dogNames");
          }}
        >
          Change Data to Dog Names
        </button>
        <button
          id="schoolMembers"
          className="border-black border-2 bg-orange-400"
          onClick={() => {
            makeActiveDataButton("schoolMembers");
            fetchData("schoolMembers");
          }}
        >
          Change Data to School Members
        </button>
        <button
          id="meteorMasses"
          className="border-black border-2 bg-purple-400"
          onClick={() => {
            makeActiveDataButton("meteorMasses");
            fetchData("meteorMasses");
          }}
        >
          Change Data to Meteor Masses
        </button>
      </div>

      <hr className="border-black"></hr>

      <WavyBackground>
      <div className="m-5">
        <h1 className="text-center">Insertion Sort</h1>
        <div className="flex flex-row">
          <div className="mx-auto text-center mb-4">
            <button
              id="insertionButton"
              className="border-2 border-black"
              onClick={() => {
                insertionStep();
              }}
            >
              Run Insertion Sort
            </button>
          </div>

          <div className="mx-auto text-center mb-4">
            <button
              id=""
              className="border-2 border-black"
              onClick={() => {
                insertionFull();
              }}
            >
              Run Full Insertion Sort
            </button>
          </div>
        </div>

        <div className="flex w-11/12 mx-10 justify-between items-center bg-white/50">
          <div className="w-3/4">
            <Bar
              data={{
                labels: insertionSortList.map(
                  (i) => Object.keys(data)[Object.values(data).indexOf(i)]
                ),
                datasets: [
                  {
                    label: "total count/value",
                    data: insertionSortList,
                    backgroundColor: insertionSortList.map(
                      (i) => colors[Object.values(data).indexOf(i)]
                    ),
                    borderColor: insertionSortList.map((i) => "black"),
                  },
                ],
              }}
              height={400}
              options={{
                barPercentage: 1.0,
                categoryPercentage: 1.0,
                animation: false,
                maintainAspectRatio: false,
                legend: {
                  labels: {
                    fontSize: 15,
                  },
                },
              }}
            />
          </div>
          <p id="resultsShower" className="p-5">
            Comparisons: 0<br />
            Swaps: 0
          </p>
        </div>
      </div>

      </WavyBackground>

      <hr className="border-black"></hr>

      <div className="m-5">
        <h1 className="text-center">Selection Sort</h1>
        <div className="flex flex-row">
          <div className="mx-auto text-center mb-4">
            <button
              id="selectionButton"
              className="border-2 border-black"
              onClick={() => {
                selectionStep();
              }}
            >
              Run Selection Sort
            </button>
          </div>

          <div className="mx-auto text-center mb-4">
            <button
              id=""
              className="border-2 border-black"
              onClick={() => {
                selectionFull();
              }}
            >
              Run Full Selection Sort
            </button>
          </div>
        </div>

        <div className="flex w-11/12 mx-10 justify-between items-center bg-white/50">
          <div className="w-3/4">
            <Bar
              data={{
                labels: selectionSortList.map(
                  (i) => Object.keys(data)[Object.values(data).indexOf(i)]
                ),
                datasets: [
                  {
                    label: "total count/value",
                    data: selectionSortList,
                    backgroundColor: selectionSortList.map(
                      (i) => colors[Object.values(data).indexOf(i)]
                    ),
                    borderColor: selectionSortList.map((i) => "black"),
                  },
                ],
              }}
              height={400}
              options={{
                barPercentage: 1.0,
                categoryPercentage: 1.0,
                animation: false,
                maintainAspectRatio: false,
                legend: {
                  labels: {
                    fontSize: 15,
                  },
                },
              }}
            />
          </div>
          <p id="resultsShowerSelection" className="p-5">
            Comparisons: 0<br />
            Swaps: 0
          </p>
        </div>
      </div>
    </>
  );
}

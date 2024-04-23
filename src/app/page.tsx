"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { FaCopy } from "react-icons/fa";

export default function Home() {
  const [searchbox, setsearchbox] = useState("");
  const [link, setlink] = useState("");
  const [isConverting, setisConverting] = useState(false);
  const [ActivateDownloadComp, setActivateDownloadComp] = useState(false);

  const options = {
    method: "POST",
    url: "https://youtube-to-mp315.p.rapidapi.com/download",
    params: {
      url: `${searchbox}`,
      format: "mp3",
    },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "6946b6847cmsh9c047d3f1b8b9a6p16ed75jsn02820c73a0a1",
      "X-RapidAPI-Host": "youtube-to-mp315.p.rapidapi.com",
    },
    data: {},
  };

  const ConvertToAudio = async () => {
    if (searchbox.length > 0) {
      try {
        setisConverting(true);
        const response = await axios.request(options);
        console.log(response.data);
        setlink(response.data.downloadUrl);
        toast.success("Video to Audio conversion Successfull");
        setActivateDownloadComp(true);
      } catch (error) {
        console.error(error);
        toast.error("Please provide valid URl");
      } finally {
        setsearchbox("");
        setisConverting(false);
      }
    }
  };

  const CopyLinktoClickboard = () => {
    window.navigator.clipboard.writeText(link);
    setlink("");
    setActivateDownloadComp(false);
    toast.success("Link Copyied");
  };

  return ActivateDownloadComp ? (
    <div className="min-h-screen flex justify-center  bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold">
      <div className="text-center mt-20">
        <h1 className="text-4xl mb-4">
          Copy the link and paste to your Browser
        </h1>
        <div className="flex items-center justify-center p-2">
          <input
            type="text"
            value={link}
            placeholder="No link found"
            className="text-black p-2 rounded-l-lg focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={CopyLinktoClickboard}
            className="bg-blue-500 text-white p-2 rounded-r-lg"
          >
            {ActivateDownloadComp ? "Copy" : "Copyied"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold p-5">
      <div className="text-4xl mb-4 mt-20">Download Songs From Youtube...</div>
      <div className="text-sm mb-4 sm:text-lg">
        Paste the link of video in input box (format -
        https://www.youtube.com/watch?v=xxxxxxx)
      </div>
      <div className="flex items-center justify-center">
        <input
          type="text"
          value={searchbox}
          placeholder="Video link"
          className="text-black p-2 rounded-l-lg focus:outline-none focus:border-blue-500"
          onChange={(e) => setsearchbox(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-3 rounded-r-lg "
          onClick={ConvertToAudio}
        >
          {isConverting ? (
            <Loader2 className=" animate-spin" />
          ) : (
            <FaDownload />
          )}
        </button>
      </div>
    </div>
  );
}

import * as React from "react";
import { Link } from "react-router-dom";

import { Textarea, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import * as URIGenerator from "./lib/urigenerator";

const APP_NAME = "hushlink";
const APP_DESCRIPTION = "a tool to conceal your links";
const APP_ICON_SRC =
  "https://em-content.zobj.net/source/microsoft-teams/363/shushing-face_1f92b.png";

type PropsNone = {};

export const FCScreenHome: React.FC<PropsNone> = ({}) => {
  const toast = useToast();

  const [sourceURL, setSourceURL] = React.useState<string>("");
  const [resultData, setResultData] = React.useState<GeneratedURL | null>(null);

  const handleClickReset = () => {
    setSourceURL("");
  };
  const handleDataFailure = (msg: string) => {
    toast({
      title: "Failure occured",
      description: msg,
      status: "error",
      duration: 5000,
      position: "top",
      isClosable: true,
    });
    handleClickReset();
  };

  React.useEffect(() => {}, []);

  return (
    <>
      <div id="section-header">
        <FCHeader subtitle={APP_DESCRIPTION} />
      </div>

      <div id="section-craft">
        <Textarea
          className="mt-1 mb-4"
          borderRadius={0}
          placeholder="Lets go! Insert your url link here!"
          onChange={(e) => setSourceURL(e.currentTarget.value)}
          value={sourceURL}
        />

        <div id="button-reels">
          {/* show when no prompt submitted */}
          <Button
            colorScheme="whatsapp"
            borderRadius={0}
            onClick={() => {
              setSourceURL(sourceURL);
            }}
          >
            Conceal Link
          </Button>

          <span className="px-2">
            <Link to={`/faqs`}>
              <Button colorScheme="gray" size={"md"} borderRadius={0}>
                FAQs
              </Button>
            </Link>
          </span>
        </div>
      </div>

      <div id="section-result">
        <FCGuardShow show={sourceURL != "" && resultData?.url != ""}>
          <div className="pt-4 pb-10">
            <div className="pb-2 font-serif font-medium text-2xl">
              {resultData?.url}
            </div>
            <div className="pb-4 text-xl font-light text-emerald-700">
              {resultData?.url}
            </div>
            <div className="">{resultData?.url}</div>
          </div>
        </FCGuardShow>
      </div>

      {/* hidden from user */}
      <FCLinkGenerator sourceURL={sourceURL} onGeneratedURL={setResultData} />
    </>
  );
};

export const FCScreenFAQ: React.FC<PropsNone> = ({}) => {
  React.useEffect(() => {}, []);
  return (
    <>
      <div id="section-header">
        <FCHeader subtitle="ssh, here are some questions and answers" />
      </div>

      <div className="pb-4"></div>

      <FCFAQItem q="Why did I make this?">
        Well, just for fun. I want to make a undecipherable prank links and
        share it in chat but I don't want to make a bitly to hide it, haha.
      </FCFAQItem>

      <FCFAQItem q="Who created this?">Me!</FCFAQItem>
    </>
  );
};

// ***

type PropsHeader = {
  subtitle: string;
};
export const FCHeader: React.FC<PropsHeader> = (p) => {
  React.useEffect(() => {}, []);
  return (
    <>
      <div id="section-header">
        <div className="pb-4">
          <div className="font-bold text-5xl">
            <Link className="" to={`/`}>
              <img className="w-16" src={APP_ICON_SRC} alt="" />
              {APP_NAME}{" "}
            </Link>
          </div>
          <div className="pt-2 text-xl">{p.subtitle}</div>
        </div>
      </div>
    </>
  );
};

type PropsFAQItem = {
  q: string;
  children: React.ReactNode;
};
export const FCFAQItem: React.FC<PropsFAQItem> = (p) => {
  React.useEffect(() => {}, []);
  return (
    <>
      <div className="mb-5">
        <div className="text-normal font-semibold mb-1">{p.q}</div>
        <div className="text-normal max-w-md mb-2">{p.children}</div>
      </div>
    </>
  );
};

type PropsTitle = {
  title: string;
};
export const FCTitle: React.FC<PropsTitle> = (p) => {
  React.useEffect(() => {}, []);
  return (
    <>
      <div className="text-4xl ">
        <Link className="py-2" to={`/`}>
          <span className="font-light">« </span>
        </Link>
        <span className="font-semibold">{p.title}</span>
      </div>
      <br />
    </>
  );
};

type PropsGuardShow = {
  children: React.ReactNode;
  show: boolean;
};
export const FCGuardShow: React.FC<PropsGuardShow> = (p) => {
  if (!p.show) return null;
  return <>{p.children}</>;
};

type PropsLinkGenerator = {
  sourceURL: string;
  onGeneratedURL: (res: GeneratedURL) => void;
};
const FCLinkGenerator: React.FC<PropsLinkGenerator> = (p) => {
  React.useEffect(() => {
    if (p.sourceURL == "") return;

    const currentURL = new URL(window.location.href);
    const currentURLString = currentURL.toString().replace(/\/$/, "");
    const out = URIGenerator.encodeURL({
      url: p.sourceURL,
    });

    p.onGeneratedURL({ url: `${currentURLString}?${out}` });
  }, [p.sourceURL]);

  return <></>;
};

// ***

type GeneratedURL = {
  url: string;
};
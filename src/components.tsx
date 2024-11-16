import * as React from "react";
import { useLocation, Link } from "react-router-dom";

import { Textarea, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import * as URIGenerator from "./lib/urigenerator";

const APP_NAME = "hushlink";
const APP_DESCRIPTION = "a tool to conceal your links";
const APP_ICON_SRC =
  "https://em-content.zobj.net/source/microsoft-teams/363/shushing-face_1f92b.png";

type PropsNone = {};
type Step = "generate" | "show" | "redirecting";

export const FCScreenHome: React.FC<PropsNone> = ({}) => {
  const toast = useToast();

  const [step, setStep] = React.useState<Step>("generate");
  const [customHeader, setCustomHeader] = React.useState<string>("");
  const [stateGenerate, setStateGenerate] = React.useState<StateGenerate>({});
  const [stateResult, setStateResult] = React.useState<StateResult>({});
  const [stateRedirect, setStateRedirect] = React.useState<StateRedirect>({
    countdown: 10,
  });
  const [generate] = useLinkGenerator();
  const [parsedURL] = useLinkParser();

  const handleGenerateURL = () => {
    if (!stateGenerate.source) throw new Error("Source URL is required");
    const result = generate(stateGenerate.source);
    setStateResult({ url: result });
    toast({
      title: "Success generating link!",
      description: "Now you can share it in chat!",
      duration: 3000,
    });
  };
  const handleCopyURL = () => {
    navigator.clipboard.writeText(stateResult.url || "");
    toast({
      title: "Success copying link!",
      description: "Now you can share it in chat!",
      duration: 3000,
    });
  };
  const handleChangeHeaderByState = () => {
    let header = "";
    switch (true) {
      case !!parsedURL:
        header = "We are redirecting youu..";
        break;
      case !!stateResult.url:
        header = "Your link is ready!";
        break;
    }
    setCustomHeader(header);
  };
  const handleChangeStepByState = () => {
    let step: Step = "generate";
    switch (true) {
      case !!parsedURL:
        step = "redirecting";
        break;
      case !!stateResult.url:
        step = "show";
        break;
    }
    setStep(step);
  };
  const handleRedirect = () => {
    // navigate(parsedURL);
    window.location.href = parsedURL; // open redirect URL in current window
  };

  React.useEffect(handleChangeHeaderByState, [stateResult, parsedURL]);
  React.useEffect(handleChangeStepByState, [stateResult, parsedURL]);
  React.useEffect(() => {
    if (step !== "redirecting") return;
    const intervalId = setInterval(() => {
      setStateRedirect((prev) => ({
        ...stateRedirect,
        countdown: Math.max(0, prev.countdown - 1),
      }));
    }, 1000); // decrement count every 1 second

    return () => {
      clearInterval(intervalId);
    };
  }, [step, parsedURL]);
  React.useEffect(() => {
    if (stateRedirect.countdown !== 0) return;
    handleRedirect();
  }, [stateRedirect, history]);

  return (
    <>
      <div id="section-header">
        <FCHeader subtitle={customHeader || APP_DESCRIPTION} />
      </div>

      <FCGuardShow show={step === "generate"}>
        <div id="section-generate">
          <Textarea
            className="mt-1 mb-4"
            borderRadius={0}
            placeholder="Lets go! Insert your url link here!"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setStateGenerate({
                ...stateGenerate,
                source: e.currentTarget.value,
              })
            }
            value={stateGenerate.source}
          />

          <div className="button-reels">
            {/* show when no prompt submitted */}
            <Button
              colorScheme="whatsapp"
              borderRadius={0}
              onClick={handleGenerateURL}
              disabled={!stateGenerate.source}
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
      </FCGuardShow>

      <FCGuardShow show={step == "show"}>
        <div id="section-result">
          <div className="pt-4 pb-10">
            <div className="pb-2 font-mono text-lg">{stateResult.url}</div>
          </div>
        </div>

        <div className="button-reels">
          <Button
            colorScheme="whatsapp"
            borderRadius={0}
            onClick={handleCopyURL}
            disabled={!stateGenerate.source}
          >
            Copy Link
          </Button>

          <span className="px-2">
            <Button
              colorScheme="gray"
              size={"md"}
              borderRadius={0}
              onClick={() => setStateResult({})}
            >
              Reset
            </Button>
          </span>
        </div>
      </FCGuardShow>

      <FCGuardShow show={step == "redirecting"}>
        <div className="button-reels">
          <Button
            colorScheme="whatsapp"
            borderRadius={0}
            onClick={handleRedirect}
          >
            Opening in {stateRedirect.countdown}s...
          </Button>
        </div>
      </FCGuardShow>
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
            <a href="/">
              <img className="w-16" src={APP_ICON_SRC} alt="" />
              {APP_NAME}
            </a>
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

const useLinkGenerator = () => {
  const generate = (sourceURL: string): string => {
    if (!sourceURL) throw new Error("Source URL is required");

    const currentURL = new URL(window.location.href);
    currentURL.search = ""; // remove query params
    const currentURLString = currentURL.toString().replace(/\/$/, "");
    const out = URIGenerator.encodeURL({
      url: sourceURL,
    });

    return `${currentURLString}?${out}`;
  };

  return [generate];
};

const useLinkParser = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const encodedURL = Array.from(queryParams.keys())[0];

  const [parsed, setParsed] = React.useState<string>("");

  const parse = (encodedURL: string): string => {
    if (!encodedURL) throw new Error("Encoded URL is required");

    const out = URIGenerator.decodeURL(encodedURL);
    return out.url;
  };

  React.useEffect(() => {
    if (!encodedURL) return;
    const out = parse(encodedURL);
    setParsed(out);
  }, [location]);

  return [parsed];
};

// ***

type StateGenerate = {
  source?: string;
};

type StateResult = {
  url?: string;
};

type StateRedirect = {
  countdown: number;
};

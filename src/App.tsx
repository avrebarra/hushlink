import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazily } from "react-lazily";

import { ChakraProvider } from "@chakra-ui/react";

import * as appconfig from "./config";

const { FCScreenHome, FCScreenFAQ } = lazily(() => import("./components"));

export function App() {
  const [readiness] = React.useState<boolean>(false);

  const funcLoadData = async () => {};
  const funcRenderLoader = () => <p>Loading...</p>;

  React.useEffect(() => {
    funcLoadData();
  }, [readiness]);

  return (
    <ChakraProvider theme={appconfig.ChakraTheme}>
      <div className="appwrapper flex justify-center items-center h-screen w-screen ">
        <div className="app w-full max-w-lg h-full xs:max-h-144">
          <div className="content p-10 py-16">
            <BrowserRouter basename={process.env.APP_BASE_PATH}>
              <React.Suspense fallback={funcRenderLoader()}>
                <Routes>
                  <Route path="/" element={<FCScreenHome />} />
                  <Route path="/faqs" element={<FCScreenFAQ />} />
                </Routes>
              </React.Suspense>
            </BrowserRouter>
            <br />
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}

import {
  Button,
  Input,
  Textarea,
  Divider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Skeleton,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { get_counter } from "./api/counter";

function App() {
  const [topic, setTopic] = useState("");
  const [opinion, setOpinion] = useState("");
  const [response, setResponse] = useState("");
  const [submittedTopic, setSubmittedTopic] = useState("");
  const [isError, setIsError] = useState(false);
  const [backgroundRotation, setBackgroundRotation] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setBackgroundRotation((prev) => prev + 1);
    }, 125);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const submit = () => {
    setIsError(false);
    setSubmittedTopic(topic);
    setResponse("loading");
    get_counter(topic, opinion)
      .then((res) => {
        setResponse(res.data.response);
      })
      .catch((err) => {
        console.error(err);
        setIsError(true);
        setResponse("Counter AI가 반박을 생성하는 중 오류가 발생했습니다.");
      });
  };

  return (
    <Container className="dark" backgroundRotation={backgroundRotation}>
      <Topic>
        {response === "" || response === "loading"
          ? "Counter AI: 반박 인공지능 도우미"
          : submittedTopic}
      </Topic>
      <Divider />
      <Main>
        <Title>
          {isError
            ? "이런! 문제가 발생했습니다😢"
            : response === ""
            ? "어떤 의견에 반박을 할까요?🙂"
            : response === "loading"
            ? "반박을 생성하는 중입니다..."
            : "👇여기 의견에 대한 반박을 생성해냈습니다👇"}
        </Title>
        {response !== "" && (
          <ResponseArea>
            <Card className="w-full shadow-xl dark:bg-default/60 backdrop-saturate-200 backdrop-blur-xl">
              <CardHeader className="font-semibold">Counter AI</CardHeader>
              <CardBody className={isError && "text-red-400"}>
                {response === "loading" ? (
                  <div className="space-y-2 ">
                    <Skeleton className="rounded-lg">
                      <div className="w-full h-4 rounded-lg backdrop-blur-xl dark:bg-default/60 backdrop-saturate-200"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg">
                      <div className="w-full h-4 rounded-lg backdrop-blur-xl dark:bg-default/60 backdrop-saturate-200"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg w-4/5">
                      <div className="w-full h-4 rounded-lg backdrop-blur-xl dark:bg-default/60 backdrop-saturate-200"></div>
                    </Skeleton>
                  </div>
                ) : (
                  response
                )}
              </CardBody>
              <CardFooter className="text-xs text-neutral-400">
                위 내용은 Counter AI가 생성한 내용으로 특정 견해를 옹호하거나
                비하하는 것이 아니며, 단지 사용자와 반대되는 견해를 제시하는
                것이 목적입니다.
              </CardFooter>
            </Card>
          </ResponseArea>
        )}
        <InputArea>
          <Input
            isClearable
            onChange={(e) => setTopic(e.target.value)}
            value={topic}
            radius="lg"
            type="text"
            label="주제"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: [
                "bg-transparent",
                "dark:group-data-[focused=true]:bg-transparent",
              ],
              inputWrapper: [
                "dark:bg-default/60",
                "dark:hover:bg-default/70",
                "dark:group-data-[focused=true]:bg-default/60",
                "shadow-xl",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "!cursor-text",
              ],
            }}
          />
          <Textarea
            isClearable
            onChange={(e) => setOpinion(e.target.value)}
            value={opinion}
            radius="lg"
            type="text"
            label="사용자 의견"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
          />
          <Button
            color="primary"
            variant="ghost"
            onPress={() => {
              submit();
            }}
          >
            제출
          </Button>
        </InputArea>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  color: #dddddd;
  background: rgb(0, 0, 100);
  background: linear-gradient(
    ${(props) => props.backgroundRotation}deg,
    rgba(0, 0, 100, 1) 0%,
    #1b0040 50%,
    rgba(100, 0, 0, 1) 100%
  );
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 3rem 10rem;
  box-sizing: border-box;
  gap: 2rem;
  overflow-y: auto;
`;

const Topic = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  width: 100%;
  height: auto;
  text-align: center;
  padding: 0.5rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 700;
  width: 100%;
  height: auto;
  text-align: center;
  padding: 1rem;
`;

const ResponseArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* max-height: 30rem; */
  gap: 1rem;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  max-width: 60rem;
  gap: 1rem;
`;

export default App;

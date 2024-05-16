import { Spin } from "antd";
import Article from "./Article";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchArticles } from "../services/services";
import ServerErrorMessage from "../components/ServerError/ServerErrorMessage";

export default function Articles() {
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const spinner = useSelector((state) => state.articlesReducer.spinner);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles(offset));
  }, [offset]);

  const articles = useSelector((state) => state.articlesReducer?.articles);
  const error = useSelector((state) => state.articlesReducer.error);
  const loading = useSelector((state) => state.articlesReducer.loading);

  const opacity = loading ? "50%" : "100%";
  const height = loading ? "140vh" : "fit-content";

  const handleClick = (pageNum) => {
    if (pageNum <= 1) {
      setPage(pageNum);
      setOffset(0);
    } else {
      setPage(pageNum);
      setOffset(5 * page);
    }
  };

  return (
    <>
      {error ? (
        <ServerErrorMessage error={error} />
      ) : (
        <div
          style={{
            opacity: `${opacity}`,
            transition: "1s",
            height: `${height}`,
          }}
          className="articles"
        >
          {spinner ? (
            <Spin
              size="large"
              style={{
                margin: "20% auto",
                width: "100%",
                height: "50%",
              }}
            />
          ) : null}
          {articles != undefined
            ? articles.map((item) => {
                const {
                  slug,
                  title,
                  description,
                  author,
                  tagList,
                  createdAt,
                  favorited,
                  favoritesCount: likes,
                } = item;

                return (
                  <Article
                    offset={offset}
                    key={slug}
                    slug={slug}
                    title={title}
                    description={description}
                    author={author}
                    tagList={tagList}
                    createdAt={createdAt}
                    favorited={favorited}
                    likes={likes}
                  />
                );
              })
            : null}

          {loading || spinner ? null : (
            <Pagination
              current={page}
              onChange={(pageNum) => handleClick(pageNum)}
              style={{
                margin: "0 auto",
                width: "fit-content",
                padding: "20px",
              }}
              total={50}
            />
          )}
        </div>
      )}
    </>
  );
}

import React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import {
  getRepository,
  getContributors,
} from "../../redux/repos/actioncCreator";
import "./repos.css";
import { Avatar, Grid } from "@mui/material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import moment from "moment";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
const Repos = () => {
  const dispatch = useDispatch();
  const [showChart, setShowChart] = useState(false);
  const [currentValue, setCurrentValue] = useState("Commits");
  const [displayedRepoCount, setDisplayedRepoCount] = useState(5);
  const [totalRepos, setTotalRepos] = useState(0);

  // console.log("data", showChart);
  useEffect(() => {
    FetchRepoData();
  }, []);
  const RepoData = useSelector((state) => state.RepositoryReducer.repo.items);
  useEffect(() => {
    FetchRepoData();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setTotalRepos(RepoData?.length);
  }, [RepoData]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      LoadMoreRepos();
    }
  };

  const LoadMoreRepos = () => {
    setDisplayedRepoCount((prevCount) => prevCount + 10);
  };
  const chartOptions = {
    title: {
      text: "Total Changes",
    },
    xAxis: {
      categories: ["Category 1", "Category 2", "Category 3"],
    },
    yAxis: {
      title: {
        text: "counts",
      },
    },
    series: [
      {
        name: "weeks by start dates",
        data: [10, 20, 15],
      },
    ],
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(4),
    margin: theme.spacing(6),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const FetchRepoData = async () => {
    await dispatch(getRepository());
  };

  // console.log("data", RepoData);

  const HandleChart = () => {
    setShowChart((prevShowChart) => !prevShowChart);
  };
  return (
    <div className="container">
      <p className="Heading">Most Starred Repos</p>

      <div>
        <Grid container spacing={2}>
          {RepoData?.slice(0, displayedRepoCount).map((data) => {
            return (
              <>
                <Grid item xs={12} sm={12} md={12}>
                  <Item className="display-div">
                    <div className="avatar-div">
                      <Avatar
                        alt="avatar-img"
                        src={data.owner.avatar_url}
                        className="avatar-img"
                      />
                    </div>
                    <div className="content-div">
                      <div className="repo-name">{data.name}</div>
                      <div className="repo-description">{data.description}</div>
                      <div className="combine-count-div">
                        <div className="stars-count">
                          Stars:- {data.stargazers_count}
                        </div>
                        <div className="issues-count">
                          Issues:-{data.open_issues_count}
                        </div>
                        <div className="date-div">
                          Last Pushed{" "}
                          {moment(data.pushed_at).format("MMMM D,YYYY")} by{" "}
                          {data.owner.login}
                        </div>
                      </div>
                    </div>
                    <div onClick={HandleChart}>
                      <KeyboardArrowRightOutlinedIcon className="arrow" />
                    </div>
                  </Item>
                  <div className="chart-div">
                    <div>
                      {showChart && (
                        <>
                          <div className="dropdown">
                            <FormControl>
                              <Select
                                value={currentValue}
                                style={{
                                  width: 400,
                                }}
                                onChange={(e) => {
                                  // console.log("Current Value", e.target.value);
                                  setCurrentValue(e.target.value);
                                }}
                              >
                                <MenuItem value="Commits">Commits</MenuItem>
                                <MenuItem value="Additions">Additions</MenuItem>
                                <MenuItem value="Deletions">Deletions</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div>
                            {" "}
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={chartOptions}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Grid>
              </>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default Repos;

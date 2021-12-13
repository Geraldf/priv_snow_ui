import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Alert, Card, CardContent, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  //const useStyles = (theme) => ({

  alertPaper: {
    width: 200,
  },
}));

export default function StoryList() {
  const [Error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const classes = useStyles();

  const ReadSNOW = async (url) => {
    setError(null);
    setLoading(true);
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const requestOptions = {
      // url: "https://karlstorz.service-now.com/api/now/table/rm_story?sysparm_query=sys_class_name%3Drm_story%5Eassignment_group%3Dfb1464bd1b24a010b43654292d4bcb16%5Erelease%3D09efcea2dbb338109392edc4059619d7&sysparm_first_row=1&sysparm_view=scrum&sysparm_choice_query_raw=&sysparm_list_header_search=true",
      // url: "http://localhost:3001/api/now/table/rm_story?sysparm_query=sys_class_name%3Drm_story%5Eassignment_group%3Dfb1464bd1b24a010b43654292d4bcb16%5Erelease%3D09efcea2dbb338109392edc4059619d7&sysparm_first_row=1&sysparm_view=scrum&sysparm_choice_query_raw=&sysparm_list_header_search=true&&sysparm_fields=number,description,short_description",
      //url: "http://localhost:3001/api/now/table/rm_story?sysparm_query=sys_id%3D02711b311b008510eac7bb739b4bcb60",
      url: url,
      headers: headers,
      // auth: {
      //   username: process.env.REACT_APP_SNUSER,
      //   password: process.env.REACT_APP_SNPW,
      // },

      //data: JSON.stringify(qrValue),
      data: {},
    };

    const result = await axios(requestOptions)
      .then((data) => {
        setError(null);
        setData(data.data.result);
      })
      .catch(function (error) {
        // catch
        var err;
        // if (error.response !== "undefined") {
        //   err = `${error.message} -- ${error.response.data.message}`;
        // } else {
        //   err = `${error.message} `;
        //}
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const url =
      "http://localhost:3001/api/now/table/rm_story?sysparm_query=sys_class_name%3Drm_story%5Eassignment_group%3Dfb1464bd1b24a010b43654292d4bcb16%5Erelease%3D09efcea2dbb338109392edc4059619d7&sysparm_first_row=1&sysparm_view=scrum&sysparm_choice_query_raw=&sysparm_list_header_search=true&&sysparm_fields=number,description,short_description";
    ReadSNOW(url);
  }, []);
  return (
    <div>
      {Error && (
        <Card sx={{ maxWidth: 1000 }}>
          <CardContent>
            <Alert
              sx={{ maxWidth: 1000 }}
              severity="error"
              classes={{ message: classes.alertPaper }}
            >
              {JSON.stringify(Error)}
            </Alert>
          </CardContent>
        </Card>
      )}

      <Typography variant="h3" gutterBottom component="div">
        Release Notes
      </Typography>
      {Data.map((row) => (
        <>
          <Card sx={{ maxWidth: 575, mb: 1 }} key={row.number}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {row.number} {" requested by: "}
                {row.u_original_requester}
              </Typography>
              <Typography variant="h5" component="div">
                {row.short_description}
              </Typography>
              <Divider />
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                Description:
              </Typography>
              <Typography variant="body2">{row.description}</Typography>
            </CardContent>
          </Card>
        </>
      ))}
    </div>
  );
}
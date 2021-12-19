import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Autocomplete,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ReadSNOW from "../tools/sn_Request";
import w_json from "../tools/w_json";

const useStyles = makeStyles((theme) => ({
  alertPaper: {
    width: 200,
  },
}));

export default function StoryList() {
  const [Error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [Releases, setReleases] = useState([]);
  const classes = useStyles();
  const [SelectedRelease, setSelectedRelease] = useState();

  const defaultProps = {
    options: Releases,
    getOptionLabel: (option) => option.short_description,
  };

  const getStoriesinRelease = () => {
    const url =
      //"http://localhost:3001/api/now/table/rm_story?sysparm_query=sys_class_name%3Drm_story%5Eassignment_group%3Dfb1464bd1b24a010b43654292d4bcb16%5Erelease%3D09efcea2dbb338109392edc4059619d7&sysparm_first_row=1&sysparm_view=scrum&sysparm_choice_query_raw=&sysparm_list_header_search=true&&sysparm_fields=number,description,short_description";

      `http://localhost:3001/api/now/table/rm_story?sysparm_query=sys_class_name=rm_story^assignment_group=fb1464bd1b24a010b43654292d4bcb16^release=${SelectedRelease}&sysparm_first_row=1&sysparm_view=scrum&sysparm_choice_query_raw=&sysparm_list_header_search=true&&sysparm_fields=number,description,short_description`;
    //"http://localhost:3001/api/now/table/rm_story?sysparm_query=sys_class_name%3Drm_story%5Eassignment_group%3Dfb1464bd1b24a010b43654292d4bcb16%5Erelease%3D&sysparm_first_row=1&sysparm_view=scrum&sysparm_choice_query_raw=&sysparm_list_header_search=true&&sysparm_fields=number,description,short_description";

    setLoading(true);
    ReadSNOW(url)
      .then((res) => {
        setData(res.data.result);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getReleases = () => {
    const url =
      "http://localhost:3001/api/now/table/rm_release_scrum?sysparam_query=rm_story%5Eassignment_group%3Dfb1464bd1b24a010b43654292d4bcb16&sysparm_limit=100";
    setLoading(true);
    ReadSNOW(url)
      .then((res) => {
        setReleases(res.data.result);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // getReleases();
    getStoriesinRelease();
  }, [SelectedRelease]);

  const onRelChange = (event, newrel) => {
    setSelectedRelease(newrel.sys_id);
  };

  useEffect(() => {
    getReleases();
  }, []);

  if (Loading) {
    return (
      <div>
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  } else {
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
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h3" gutterBottom component="div">
              Release Notes
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              onChange={onRelChange}
              {...defaultProps}
              id="auto-complete"
              autoComplete
              includeInputInList
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Please select the Release!"
                  variant="standard"
                />
              )}
            />
          </Grid>
        </Grid>

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
}

import React from "react";
import Header from "../Components/Header";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TimelineIcon from "@mui/icons-material/Timeline";
import GroupsIcon from "@mui/icons-material/Groups";
import LoopIcon from "@mui/icons-material/Loop";
import InsightsIcon from "@mui/icons-material/Insights";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

const COLORS = {
  primary: "#4a77e5", // Blue - primary actions, highlights
  secondary: "#e5b44a", // Gold - secondary actions, accents
  accent: "#e5664a", // Coral - attention-grabbing elements
  background: "#f5f7fa",
  white: "#ffffff",
  gray: "#f0f0f0",
  darkGray: "#555555",
};

function DelphiMethodPage() {
  return (
    <Box sx={{ backgroundColor: COLORS.background, minHeight: "100vh" }}>
      <Header />

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            mb: 5,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${COLORS.primary} 0%, #3d5dc9 100%)`,
            color: COLORS.white,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -70,
              left: -70,
              width: 250,
              height: 250,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            }}
          />

          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ mb: 2, position: "relative" }}
          >
            The Delphi Method
          </Typography>
          <Typography
            variant="h5"
            sx={{ mb: 3, maxWidth: "80%", position: "relative" }}
          >
            A structured communication technique for achieving consensus among
            experts
          </Typography>
        </Paper>

        {/* What is the Delphi Method */}
        <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color={COLORS.primary}
            gutterBottom
          >
            What is the Delphi Method?
          </Typography>
          <Typography variant="body1" paragraph>
            The Delphi method is a structured communication technique designed
            to obtain the most reliable consensus from a group of experts. It
            was originally developed as a way to forecast the impact of
            technology on warfare, but has since been applied across various
            fields including healthcare, education, information systems, and
            policy making.
          </Typography>
          <Typography variant="body1" paragraph>
            Unlike traditional group discussion methods where dominant
            personalities might influence outcomes, the Delphi method uses a
            series of questionnaires and controlled opinion feedback to reach
            consensus without direct confrontation between experts. This reduces
            the effects of status, personality, and other social dynamics that
            can distort group decisions.
          </Typography>
        </Paper>

        {/* Key Characteristics */}
        <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color={COLORS.primary}
            gutterBottom
          >
            Key Characteristics
          </Typography>
          <List>
            {[
              {
                icon: (
                  <GroupsIcon
                    fontSize="medium"
                    sx={{ color: COLORS.primary }}
                  />
                ),
                title: "Expert Panel",
                description:
                  "Relies on a panel of selected experts with deep knowledge in the subject area.",
              },
              {
                icon: (
                  <TimelineIcon
                    fontSize="medium"
                    sx={{ color: COLORS.primary }}
                  />
                ),
                title: "Structured Communication",
                description:
                  "Uses sequential questionnaires rather than unstructured group discussion.",
              },
              {
                icon: (
                  <LoopIcon fontSize="medium" sx={{ color: COLORS.primary }} />
                ),
                title: "Iterative Process",
                description:
                  "Features multiple rounds of questions with feedback between rounds.",
              },
              {
                icon: (
                  <InsightsIcon
                    fontSize="medium"
                    sx={{ color: COLORS.primary }}
                  />
                ),
                title: "Controlled Feedback",
                description:
                  "Provides anonymized statistical summaries of group responses after each round.",
              },
              {
                icon: (
                  <EmojiObjectsIcon
                    fontSize="medium"
                    sx={{ color: COLORS.primary }}
                  />
                ),
                title: "Anonymity",
                description:
                  "Preserves participant anonymity to prevent groupthink and minimize bias.",
              },
            ].map((item, index) => (
              <ListItem key={index} alignItems="flex-start" sx={{ py: 1 }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="h6" fontWeight="bold">
                      {item.title}
                    </Typography>
                  }
                  secondary={item.description}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* How It Works */}
        <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color={COLORS.primary}
            gutterBottom
          >
            How The Delphi Method Works
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              mb: 4,
            }}
          >
            <Paper
              elevation={2}
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 2,
                borderTop: `4px solid ${COLORS.primary}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Round 1
              </Typography>
              <Typography variant="body1">
                Experts answer the first questionnaire with their initial
                opinions. Responses are collected and analyzed.
              </Typography>
            </Paper>

            <Paper
              elevation={2}
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 2,
                borderTop: `4px solid ${COLORS.secondary}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Round 2
              </Typography>
              <Typography variant="body1">
                Participants receive anonymous feedback summarizing Round 1
                results, then reconsider and revise their answers.
              </Typography>
            </Paper>

            <Paper
              elevation={2}
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 2,
                borderTop: `4px solid ${COLORS.accent}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Round 3+
              </Typography>
              <Typography variant="body1">
                Process repeats with refinement until consensus is achieved or
                diminishing returns are observed.
              </Typography>
            </Paper>
          </Box>

          <Typography variant="body1" paragraph>
            The Delphi process typically continues for 3-5 rounds, though this
            can vary based on the complexity of the subject and how quickly
            consensus is reached. The results of the final round represent the
            group's collective opinion, factoring in the expertise and insights
            of all participants.
          </Typography>
        </Paper>

        {/* Applications */}
        <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color={COLORS.primary}
            gutterBottom
          >
            Applications of the Delphi Method
          </Typography>

          <Accordion disableGutters elevation={1} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="medium">
                Healthcare & Medical Research
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Used to develop clinical guidelines, establish diagnosis
                criteria, and prioritize healthcare interventions. Particularly
                valuable for addressing complex clinical questions where
                high-quality evidence is limited.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  Example Applications:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{ color: COLORS.primary }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Developing treatment protocols for rare diseases" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{ color: COLORS.primary }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Identifying quality indicators for patient care" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{ color: COLORS.primary }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Forecasting healthcare technology needs" />
                  </ListItem>
                </List>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion disableGutters elevation={1} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="medium">
                Education & Curriculum Development
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Applied to curriculum planning, educational policy decisions,
                and program evaluation. Helps integrate perspectives from
                various stakeholders including teachers, administrators, and
                subject experts.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  Example Applications:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{ color: COLORS.primary }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Developing competency frameworks for professional education" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{ color: COLORS.primary }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Identifying future skills needed in emerging fields" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{ color: COLORS.primary }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Creating assessment criteria for educational programs" />
                  </ListItem>
                </List>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion disableGutters elevation={1} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="medium">
                Business & Strategic Planning
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Used for forecasting market trends, technological developments,
                and strategic decision-making. Helps organizations navigate
                uncertainty by leveraging collective expertise.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  Example Applications:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{ color: COLORS.primary }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Predicting industry disruptions and technological advancements" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{ color: COLORS.primary }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Developing risk management frameworks" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{ color: COLORS.primary }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Prioritizing strategic initiatives and resource allocation" />
                  </ListItem>
                </List>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion disableGutters elevation={1}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight="medium">
                Policy Development & Government
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Facilitates policy development, regulatory decisions, and
                long-term planning in government and public sectors.
                Particularly valuable for complex societal issues requiring
                multi-disciplinary expertise.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  Example Applications:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{ color: COLORS.primary }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Developing environmental protection strategies" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{ color: COLORS.primary }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Setting priorities for public health initiatives" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{ color: COLORS.primary }}
                      />
                    </ListItemIcon>
                    <ListItemText primary="Forecasting infrastructure needs for urban planning" />
                  </ListItem>
                </List>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Paper>

        {/* Advantages and Limitations */}
        <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color={COLORS.primary}
            gutterBottom
          >
            Advantages and Limitations
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                fontWeight="bold"
                color={COLORS.secondary}
                gutterBottom
              >
                Advantages
              </Typography>
              <List>
                {[
                  "Eliminates social pressures and group dynamics that can bias results",
                  "Provides structured approach to collect expert opinions on complex issues",
                  "Allows participation from geographically dispersed experts",
                  "Preserves diversity of thought while working toward consensus",
                  "Creates quantifiable results from qualitative expert opinions",
                  "Reduces noise and focuses on core issues through multiple iterations",
                ].map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon
                        sx={{ color: COLORS.secondary }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                fontWeight="bold"
                color={COLORS.accent}
                gutterBottom
              >
                Limitations
              </Typography>
              <List>
                {[
                  "Time-consuming process requiring commitment from expert participants",
                  "Quality heavily dependent on selection of appropriate experts",
                  "May lead to watered-down compromises rather than innovative solutions",
                  "Potential for researcher bias in summarizing and interpreting results",
                  "Risk of expert fatigue with multiple rounds of questioning",
                  "May not capture all nuances of complex problems",
                ].map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon sx={{ color: COLORS.accent }} />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>

        {/* Using our Delphi Web App */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: COLORS.primary,
            color: COLORS.white,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Using Our Delphi Web App
          </Typography>
          <Typography variant="body1" paragraph>
            Our Delphi Web App simplifies the implementation of the Delphi
            method, making it accessible for researchers, educators, business
            analysts, and policy makers. The platform automates the iterative
            process, handles anonymous feedback, and provides visualization
            tools for results analysis.
          </Typography>
          <Typography variant="body1" paragraph>
            Key features include:
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                sx={{
                  p: 2,
                  height: "100%",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(5px)",
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Easy Setup
                </Typography>
                <Typography variant="body2">
                  Create customized surveys with multiple question types, invite
                  participants via email, and manage multiple Delphi rounds from
                  a single dashboard.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                sx={{
                  p: 2,
                  height: "100%",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(5px)",
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Automated Feedback
                </Typography>
                <Typography variant="body2">
                  Automatic generation of statistical summaries and
                  visualizations between rounds, facilitating informed revision
                  of opinions based on group responses.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                sx={{
                  p: 2,
                  height: "100%",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(5px)",
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Comprehensive Analysis
                </Typography>
                <Typography variant="body2">
                  Advanced analytics tools for examining consensus development,
                  including agreement metrics, visualizations, and exportable
                  reports for publication or presentation.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default DelphiMethodPage;

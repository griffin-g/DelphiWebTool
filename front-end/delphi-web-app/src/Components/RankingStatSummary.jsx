import { Typography, Paper, Grid } from "@mui/material";

export const RankingStatSummary = ({ responses = [], labels = [], type }) => {
  const calculateCheckboxStats = (responses, labels) => {
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      return null;
    }

    const stats = labels.reduce((acc, label) => {
      acc[label] = {
        checkedCount: 0,
        percentage: 0,
      };
      return acc;
    }, {});

    responses.forEach((response) => {
      if (Array.isArray(response)) {
        response.forEach((choice) => {
          if (stats[choice]) {
            stats[choice].checkedCount++;
          }
        });
      }
    });

    let mostChecked = null;
    let maxChecks = -1;

    Object.entries(stats).forEach(([label, data]) => {
      stats[label].percentage = (data.checkedCount / responses.length) * 100;
      if (data.checkedCount > maxChecks) {
        maxChecks = data.checkedCount;
        mostChecked = label;
      }
    });

    const fleissKappa = calculateFleissKappa(responses, labels);

    return {
      stats,
      mostChecked,
      fleissKappa,
    };
  };

  const calculateKendallsW = (responses, labels) => {
    if (
      !responses ||
      responses.length === 0 ||
      !labels ||
      labels.length === 0
    ) {
      return 0;
    }

    const n = labels.length; // number of objects being ranked
    const m = responses.length; // number of respondents

    // Convert rankings to numeric positions
    const rankings = responses.map((response) => {
      const rankMap = {};
      response.forEach((item, index) => {
        rankMap[item] = index + 1;
      });
      return labels.map((label) => rankMap[label] || 0);
    });

    // Calculate Ri (sum of ranks for each item)
    const Ri = labels.map((_, i) =>
      rankings.reduce((sum, ranking) => sum + ranking[i], 0)
    );

    // Calculate mean of Ri
    const meanRi = Ri.reduce((sum, r) => sum + r, 0) / n;

    // Calculate S (sum of squared deviations)
    const S = Ri.reduce((sum, r) => sum + Math.pow(r - meanRi, 2), 0);

    // Calculate W
    const W = (12 * S) / (Math.pow(m, 2) * (Math.pow(n, 3) - n));

    return W;
  };

  const calculateRankStats = (responses, labels) => {
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      return null;
    }

    // Initialize stats object
    const stats = labels.reduce((acc, label) => {
      acc[label] = {
        firstPlaceCount: 0,
        lastPlaceCount: 0,
        avgRank: 0,
      };
      return acc;
    }, {});

    // Calculate stats
    responses.forEach((response) => {
      if (Array.isArray(response) && response.length > 0) {
        // Count first place rankings
        const firstChoice = response[0];
        if (firstChoice && stats[firstChoice]) {
          stats[firstChoice].firstPlaceCount++;
        }

        // Count last place rankings
        const lastChoice = response[response.length - 1];
        if (lastChoice && stats[lastChoice]) {
          stats[lastChoice].lastPlaceCount++;
        }

        // Calculate average ranking
        response.forEach((choice, index) => {
          if (choice && stats[choice]) {
            stats[choice].avgRank += index + 1;
          }
        });
      }
    });

    let bestChoice = null;
    let worstChoice = null;
    let maxFirstPlace = -1;
    let maxLastPlace = -1;

    Object.entries(stats).forEach(([label, data]) => {
      stats[label].avgRank /= responses.length;

      if (data.firstPlaceCount > maxFirstPlace) {
        maxFirstPlace = data.firstPlaceCount;
        bestChoice = label;
      }

      if (data.lastPlaceCount > maxLastPlace) {
        maxLastPlace = data.lastPlaceCount;
        worstChoice = label;
      }
    });

    const kendallsW = calculateKendallsW(responses, labels);

    return {
      stats,
      bestChoice,
      worstChoice,
      kendallsW,
    };
  };

  const calculateFleissKappa = (responses, labels) => {
    if (!responses || responses.length === 0) return 0;

    const n = responses.length; // number of cases (respondents)
    const m = labels.length; // number of categories (choices)

    // Convert responses to binary matrix (1 for checked, 0 for unchecked)
    const matrix = responses.map((response) =>
      labels.map((label) => (response.includes(label) ? 1 : 0))
    );

    // Calculate p_j (proportion of all assignments which were to the j-th category)
    const pj = labels.map((_, j) => {
      const sum = matrix.reduce((sum, row) => sum + row[j], 0);
      return sum / (n * m);
    });

    // Calculate P_i (extent to which raters agree for the i-th subject)
    const Pi = matrix.map((row) => {
      const sum = row.reduce((sum, val) => sum + val, 0);
      return (sum * (sum - 1)) / (m * (m - 1));
    });

    // Calculate P_bar (mean of Pi)
    const Pbar = Pi.reduce((sum, pi) => sum + pi, 0) / n;

    // Calculate Pe_bar (expected agreement by chance)
    const Pebar = pj.reduce((sum, p) => sum + p * p, 0);

    // Calculate kappa
    const kappa = (Pbar - Pebar) / (1 - Pebar);
    return kappa;
  };

  const stats =
    type === "checkbox"
      ? calculateCheckboxStats(responses, labels)
      : calculateRankStats(responses, labels);

  if (!stats) {
    return null;
  }

  if (type === "checkbox") {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Checkbox Summary
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" color="primary">
            Most Selected Option: {stats.mostChecked}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Selected {stats.stats[stats.mostChecked].checkedCount} times (
            {stats.stats[stats.mostChecked].percentage.toFixed(1)}%)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Selection Rates
          </Typography>
          {labels.map((label) => (
            <Typography key={label} variant="body2" color="text.secondary">
              {label}: {stats.stats[label].checkedCount} selections (
              {stats.stats[label].percentage.toFixed(1)}%)
            </Typography>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Agreement Analysis
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fleiss' Kappa: {stats.fleissKappa.toFixed(3)}
            {stats.fleissKappa < 0.2 && " (Poor agreement)"}
            {stats.fleissKappa >= 0.2 &&
              stats.fleissKappa < 0.4 &&
              " (Fair agreement)"}
            {stats.fleissKappa >= 0.4 &&
              stats.fleissKappa < 0.6 &&
              " (Moderate agreement)"}
            {stats.fleissKappa >= 0.6 &&
              stats.fleissKappa < 0.8 &&
              " (Substantial agreement)"}
            {stats.fleissKappa >= 0.8 && " (Almost perfect agreement)"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {stats.fleissKappa < 0.2 &&
              "There is poor agreement among respondents in their selections."}
            {stats.fleissKappa >= 0.2 &&
              stats.fleissKappa < 0.4 &&
              "There is fair agreement among respondents in their selections."}
            {stats.fleissKappa >= 0.4 &&
              stats.fleissKappa < 0.6 &&
              "There is moderate agreement among respondents in their selections."}
            {stats.fleissKappa >= 0.6 &&
              stats.fleissKappa < 0.8 &&
              "There is substantial agreement among respondents in their selections."}
            {stats.fleissKappa >= 0.8 &&
              "There is almost perfect agreement among respondents in their selections."}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Ranking Summary
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="body1" color="primary">
          Most Preferred Choice: {stats.bestChoice}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Received {stats.stats[stats.bestChoice].firstPlaceCount} first place
          votes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Average Rank: {stats.stats[stats.bestChoice].avgRank.toFixed(2)}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="body1" color="error">
          Least Preferred Choice: {stats.worstChoice}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Received {stats.stats[stats.worstChoice].lastPlaceCount} last place
          votes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Average Rank: {stats.stats[stats.worstChoice].avgRank.toFixed(2)}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Average Rankings
        </Typography>
        {labels.map((label) => (
          <Typography key={label} variant="body2" color="text.secondary">
            {label}: {stats.stats[label].avgRank.toFixed(2)}
          </Typography>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Agreement Analysis
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Kendall's W: {stats.kendallsW.toFixed(3)}
          {stats.kendallsW < 0.3 && " (Low agreement)"}
          {stats.kendallsW >= 0.3 &&
            stats.kendallsW < 0.7 &&
            " (Moderate agreement)"}
          {stats.kendallsW >= 0.7 && " (Strong agreement)"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {stats.kendallsW < 0.3 &&
            "There is little consensus among respondents in their rankings."}
          {stats.kendallsW >= 0.3 &&
            stats.kendallsW < 0.7 &&
            "There is moderate consensus among respondents in their rankings."}
          {stats.kendallsW >= 0.7 &&
            "There is strong consensus among respondents in their rankings."}
        </Typography>
      </Grid>
    </Grid>
  );
};

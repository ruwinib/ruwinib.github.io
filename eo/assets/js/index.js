function calculateFinalMarks(valuesObj) {
  var total = 0;
  $.each(valuesObj, function(key, value) {
    total += value;
  });
  var final = ((total - 24) * 100) / 96;
  return final.toFixed(2);
}

function drawGraph(valuesObj, selector) {
  var total = 0;
  var lablesVals = [
    "Pro-activeness",
    "Risk taking",
    "Autonomy",
    "Innovativeness",
    "Competitive Aggressiveness"
  ];
  var marksVals = [0, 0, 0, 0, 0];
  var quectionCountVals = [5, 5, 3, 7, 4];
  var totalVals = [20, 20, 12, 28, 16];
  var seriesVals = [0, 0, 0, 0, 0];
  $.each(valuesObj, function(key, value) {
    var index = parseInt(key.charAt(2)) - 1;
    marksVals[index] += value;
  });
  for (var i = 0; i < 5; i++) {
    seriesVals[i] =
      ((marksVals[i] - quectionCountVals[i]) * 100) / totalVals[i];
    seriesVals[i] = seriesVals[i].toFixed(2);
  }
  new Chartist.Bar(
    selector,
    {
      labels: lablesVals,
      series: seriesVals
    },
    {
      distributeSeries: true
    }
  );
}

function init() {
  $("#page-wrapper").hide();
  var json = {
    title: "Entrepreneurship Orientation Questionnaire",
    showProgressBar: "top",
    pages: [
      {
        title: "Pro-activeness",
        questions: [
          {
            type: "rating",
            name: "q_1_1",
            title:
              "Being uneducated and specifically untrained is not an obstacle for farming",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_1_2",
            title:
              "I/we have self-confidence about my abilities and competencies",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_1_3",
            title:
              "I/we act opportunistically to shape the business environment in which we operate",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_1_4",
            title:
              "I/we look forward to seize initiatives whenever possible in our target market operations",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_1_5",
            title:
              "I/We seek to exploit anticipated changes in future market conditions ahead of our rivals",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          }
        ]
      },
      {
        title: "Risk taking",
        questions: [
          {
            type: "rating",
            name: "q_2_1",
            title: "A recession or loss is temporary in farming",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_2_2",
            title:
              "I have no doubt to try new crop varieties and new technologies",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_2_3",
            title:
              "I'm in general, tends to invest in high-risk projects (with chances of high returns).",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_2_4",
            title:
              "My business shows a great deal of tolerance for venturing into the unknown",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_2_5",
            title:
              "My business strategy is characterized by a tendency to commit resources into projects with uncertain outcomes",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          }
        ]
      },
      {
        title: "Autonomy",
        questions: [
          {
            type: "rating",
            name: "q_3_1",
            title: "I like to work independently",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_3_2",
            title:
              "All plans should be challengeable according to my need and requirement",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_3_3",
            title:
              "Generally, I behave autonomously in my existing business operations",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          }
        ]
      },
      {
        title: "Innovativeness",
        questions: [
          {
            type: "rating",
            name: "q_4_1",
            title:
              "Problems and challenges are sold through experience and innovative thinking",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_4_2",
            title:
              "The productivity of the farm can be increased through innovation and creativity",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_4_3",
            title:
              "Although following the regular pattern is easier modifying, adopting new agricultural methods according to the local conditions is more useful",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_4_4",
            title:
              "During the past three years I have developed new fertilizer/ liquid fertilizer",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_4_5",
            title:
              "During the past three years I have developed new farming equipment/machine",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_4_6",
            title:
              "I think my business provides technological leadership in developing new products/services.",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_4_7",
            title:
              "Generally, I'm trying to provide my products with a novel idea",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          }
        ]
      },
      {
        title: "Competitive Aggressiveness",
        questions: [
          {
            type: "rating",
            name: "q_5_1",
            title: "I try hard to take customers from competitors",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_5_2",
            title:
              "I watch competitors' business strategies to react against them promptly",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_5_3",
            title:
              "I prefer aggressive marketing of new menus of growing and services through the Internet",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          },
          {
            type: "rating",
            name: "q_5_4",
            title: "I prefer aggressive price competition",
            mininumRateDescription: "completely disagree",
            maximumRateDescription: "completely agree",
            isRequired: true
          }
        ]
      }
    ],
    completedHtml:
      "<p><h2>Thank You For Using Our Application !!!</h2></p><p>Please find below your result and result destribution</p>"
  };

  window.survey = new Survey.Model(json);

  survey.onComplete.add(function(result, options) {
    console.log(result, options);
    document.querySelector("#final_marks").innerHTML =
      calculateFinalMarks(result.data) + "%";
    document.querySelector(".sv_result_heading").innerHTML =
      "Your Score for EO";
    drawGraph(result.data, "#final_chart");
    $(".sv_reload").show();
  });

  survey.requiredText = "";

  $("#surveyElement").Survey({
    model: survey
  });
}

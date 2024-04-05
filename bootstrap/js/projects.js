const data = [
  {
    id: "7.0",
    parent: "",
    name: "Paragyte",
    tooltipHeader: "Employment Details",
    tooltip: [
      ["Organization", "Paragyte, Pune India"],
      ["Period", "Apr 2012 - Apr 2014"],
      ["Role", "Technical Lead"],
      ["Employment Type", "Full Time - Employee"],
    ],
  },
  {
    id: "6.0",
    parent: "",
    name: "Aretove Inc",
    tooltipHeader: "Employment Details",
    tooltip: [
      ["Organization", "Aretove Inc, Pune India"],
      ["Period", "Aug 2014 - Mar 2015"],
      ["Role", "Technical Lead"],
      ["Employment Type", "Full Time - Employee"],
    ],
  },
  {
    id: "5.0",
    parent: "",
    name: "Mastercard",
    tooltipHeader: "Employment Details",
    tooltip: [
      ["Organization", "Mastercard, Pune India"],
      ["Period", "May 2015 - Jun 2018"],
      ["Role", "Technical Lead"],
      ["Employment Type", "Full Time - Employee"],
    ],
  },
  {
    id: "4.0",
    parent: "",
    name: "Capgmemini India",
    tooltipHeader: "Employment Details",
    tooltip: [
      ["Organization", "Capgemini - Client: ANZ, Wellington"],
      ["Period", "Jun 2018 - Jun 2019"],
      ["Role", "Technical Lead"],
      ["Employment Type", "Full Time - Employee"],
    ],
  },
  {
    id: "3.0",
    parent: "",
    name: "Ministry of Education, NZ",
    tooltipHeader: "Employment Details",
    tooltip: [
      ["Organization", "Ministry of Education, NZ"],
      ["Period", "Jun 2019 - Jan 2020"],
      ["Role", "Technical Lead"],
      ["Employment Type", "Full Time - Employee"],
    ],
  },
  {
    id: "2.0",
    parent: "",
    name: "DataTorque, NZ",
    tooltipHeader: "Employment Details",
    tooltip: [
      ["Organization", "DataTorque, New Zealand"],
      ["Period", "Feb 2020 - Jul 2022"],
      ["Role", "Practice Lead"],
      ["Employment Type", "Full Time - Employee"],
    ],
  },
  {
    id: "1.0",
    parent: "",
    name: "Capgemini NZ",
    tooltipHeader: "Employment Details",
    tooltip: [
      ["Organization", "Capgemini, New Zealand"],
      ["Period", "Jul 2022 - Current"],
      ["Role", "Lead Developer"],
      ["Employment Type", "Self Employed"],
    ],
  },
  //Capgemini projects
  {
    id: "1.0.1",
    parent: "1.0",
    name: "Visa Triage Application",
    tooltip: "Immigration NZ Visa Triage Application",
    tooltipHeader: "Project Details",
    tooltip: [
      ["Project", "Visa Triage Application"],
      [
        "Summary",
        "Immigration New Zealand uses this system to triage visa applications.",
      ],
      ["Duration", "8 Months"],
      ["Role", "Technical Lead"],
      ["Team Size", "5"],
    ],
  },
  {
    id: "1.0.1.10",
    parent: "1.0.1",
    name: "C#",
    tooltip: "C#",
  },
  {
    id: "1.0.1.20",
    parent: "1.0.1",
    name: "Azure",
  },
  {
    id: "1.0.1.30",
    parent: "1.0.1",
    name: "Service Bus",
  },
  {
    id: "1.0.1.40",
    parent: "1.0.1",
    name: "Angular 2",
  },
  {
    id: "1.0.1.50",
    parent: "1.0.1",
    name: "Web API",
  },
  {
    id: "1.0.1.60",
    parent: "1.0.1",
    name: "WCF",
  },
  // Capgem RIOD
  {
    id: "1.0.2",
    parent: "1.0",
    name: "RIOD",
    tooltipHeader: "Project Details",
    tooltip: [
      ["Project", "RIOD"],
      [
        "Summary",
        "Realtime Intelligence and Operational Deployments used by police to respond to emergencies.",
      ],
      ["Duration", "6 Months"],
      ["Role", "Senior Developer"],
      ["Team Size", "9"],
    ],
  },
  {
    id: "1.0.2.10",
    parent: "1.0.2",
    name: "C#",
    tooltip: "with .net 6",
  },
  {
    id: "1.0.2.20",
    parent: "1.0.2",
    name: "ReactJS + TypeScript",
  },
  {
    id: "1.0.2.30",
    parent: "1.0.2",
    name: "Azure Function App",
  },
  {
    id: "1.0.2.40",
    parent: "1.0.2",
    name: "Azure Cosmos DB",
    tooltip: "Azure Cosmos DB deployed in multiple regions",
  },
  {
    id: "1.0.2.50",
    parent: "1.0.2",
    name: "Service Bus",
  },
  {
    id: "1.0.2.60",
    parent: "1.0.2",
    name: "Bicep",
  },
  {
    id: "1.0.2.70",
    parent: "1.0.2",
    name: "JSS",
  },
  {
    id: "1.0.2.80",
    parent: "1.0.2",
    name: "NUnit",
  },
  {
    id: "1.0.2.90",
    parent: "1.0.2",
    name: "Jest & Enzyme",
  },
  {
    id: "1.0.2.100",
    parent: "1.0.2",
    name: "Azure Devops",
  },
  // Capgem Toyota
  {
    id: "1.0.3",
    parent: "1.0",
    name: "Toyota NZ",
    tooltip: "Toyota NZ Website",
    tooltipHeader: "Project Details",
    tooltip: [
      ["Project", "Toyota NZ"],
      [
        "Summary",
        "Toyota NZ website used by toyota to sell new/used cars, accessories, insurance, service bookings, etc.",
      ],
      ["Duration", "12 Months"],
      ["Role", "Technical Lead"],
      ["Team Size", "6"],
      ["Project URL", "https://toyota.co.nz"],
    ],
  },
  {
    id: "1.0.3.10",
    parent: "1.0.3",
    name: "C#",
    tooltip: "With .net 4.8",
  },
  {
    id: "1.0.3.20",
    parent: "1.0.3",
    name: "Optimizely CMS 11",
  },
  {
    id: "1.0.3.30",
    parent: "1.0.3",
    name: "Asp.net MVC 5",
  },
  {
    id: "1.0.3.40",
    parent: "1.0.3",
    name: "VueJS + TypeScript",
    tooltip: "Composition and Option Api",
  },
  {
    id: "1.0.3.50",
    parent: "1.0.3",
    name: "Backbone JS",
  },
  {
    id: "1.0.3.60",
    parent: "1.0.3",
    name: "JQuery",
    tooltip: "Jquery Widgets, dialog, datatables, tabs, etc.",
  },
  {
    id: "1.0.3.70",
    parent: "1.0.3",
    name: "Razor pages",
  },
  {
    id: "1.0.3.80",
    parent: "1.0.3",
    name: "Azure Devops",
  },
  {
    id: "1.0.3.90",
    parent: "1.0.3",
    name: "Azure SQL database",
  },
  // DataTorque
  {
    id: "2.0.1",
    parent: "2.0",
    name: "Guyana RMS Online",
    tooltipHeader: "Project Details",
    tooltip: [
      ["Project", "Guyana RMS Online"],
      [
        "Summary",
        "Guyana RMS Online, allows taxpayers to file their Tax Returns and check their outstanding or refunds due for taxes.",
      ],
      ["Duration", "6 Months"],
      ["Role", "Team Lead"],
      ["Team Size", "8"],
      ["Project URL", "https://eservices.gra.gov.gy/"],
    ],
  },
  {
    id: "2.0.1.10",
    parent: "2.0.1",
    name: "C#",
    tooltip: "With .net core 2.1",
  },
  {
    id: "2.0.1.20",
    parent: "2.0.1",
    name: "Sql Server 2016",
  },
  {
    id: "2.0.1.21",
    parent: "2.0.1",
    name: "Stored Procedures",
  },
  {
    id: "2.0.1.22",
    parent: "2.0.1",
    name: "SSRS",
    tooltip: "Sql Server Reporting Services",
  },
  {
    id: "2.0.1.30",
    parent: "2.0.1",
    name: "Asp.net MVC 5 & WebApi",
  },
  {
    id: "2.0.1.40",
    parent: "2.0.1",
    name: "VueJS",
  },
  {
    id: "2.0.1.50",
    parent: "2.0.1",
    name: "NUnit",
  },
  {
    id: "2.0.1.60",
    parent: "2.0.1",
    name: "Cypress IO",
    tooltip:
      "I was proud to pilot and introduce automated UI tests for RMS web and did integrate these UI tests in Build pipeline. These tests were real saviour and did help save a lot of costs, the team used to spend in past fixing newly introduced bugs in the shared code.",
  },
  {
    id: "2.0.1.70",
    parent: "2.0.1",
    name: "Razor pages",
  },
  {
    id: "2.0.2",
    parent: "2.0",
    name: "Belize RMS Online",
    tooltipHeader: "Project Details",
    tooltip: [
      ["Project", "Belize RMS Online"],
      [
        "Summary",
        "Belize RMS Online, allows taxpayers to file their Tax Returns and check their outstanding or refunds due for taxes.",
      ],
      ["Duration", "8 Months"],
      ["Role", "Team Lead"],
      ["Team Size", "10"],
      ["Project Url", "https://irisbelize.bts.gov.bz/"],
    ],
  },
  {
    id: "2.0.2.10",
    parent: "2.0.2",
    name: "C#",
    tooltip: "With .net core 2.1",
  },
  {
    id: "2.0.2.20",
    parent: "2.0.2",
    name: "Sql Server 2016",
  },
  {
    id: "2.0.2.21",
    parent: "2.0.2",
    name: "Stored Procedures",
  },
  {
    id: "2.0.2.22",
    parent: "2.0.2",
    name: "SSRS",
    tooltip: "Sql Server Reporting Services",
  },
  {
    id: "2.0.2.30",
    parent: "2.0.2",
    name: "Asp.net MVC 5 & WebApi",
  },
  {
    id: "2.0.2.40",
    parent: "2.0.2",
    name: "VueJS",
  },
  {
    id: "2.0.2.50",
    parent: "2.0.2",
    name: "NUnit",
  },
  {
    id: "2.0.2.60",
    parent: "2.0.2",
    name: "Cypress IO",
    tooltip:
      "I was proud to pilot and introduce automated UI tests for RMS web and did integrate these UI tests in Build pipeline. These tests were real saviour and did help save a lot of costs, the team used to spend in past fixing newly introduced bugs in the shared code.",
  },
  {
    id: "2.0.2.70",
    parent: "2.0.2",
    name: "Razor pages",
  },
  {
    id: "2.0.3",
    parent: "2.0",
    name: "Jersey RMS Online",
    tooltipHeader: "Project Details",
    tooltip: [
      ["Project", "Jersey RMS Online"],
      [
        "Summary",
        "Jersey RMS Online, allows taxpayers to file their Tax Returns and check their outstanding or refunds due for taxes.",
      ],
      ["Duration", "6 Months"],
      ["Role", "Team Lead"],
      ["Team Size", "10"],
      ["Project URL", "https://one.gov.je/en"],
    ],
  },
  {
    id: "2.0.3.10",
    parent: "2.0.3",
    name: "C#",
    tooltip: "With .net core 2.1",
  },
  {
    id: "2.0.3.20",
    parent: "2.0.3",
    name: "Sql Server 2016",
  },
  {
    id: "2.0.3.21",
    parent: "2.0.3",
    name: "Stored Procedures",
  },
  {
    id: "2.0.3.22",
    parent: "2.0.3",
    name: "SSRS",
    tooltip: "Sql Server Reporting Services",
  },
  {
    id: "2.0.3.30",
    parent: "2.0.3",
    name: "Asp.net MVC 5 & WebApi",
  },
  {
    id: "2.0.3.40",
    parent: "2.0.3",
    name: "VueJS",
  },
  {
    id: "2.0.3.50",
    parent: "2.0.3",
    name: "NUnit",
  },
  {
    id: "2.0.3.60",
    parent: "2.0.3",
    name: "Cypress IO",
    tooltip:
      "I was proud to pilot and introduce automated UI tests for RMS web and did integrate these UI tests in Build pipeline. These tests were real saviour and did help save a lot of costs, the team used to spend in past fixing newly introduced bugs in the shared code.",
  },
  {
    id: "2.0.3.70",
    parent: "2.0.3",
    name: "Razor pages",
  },
  {
    id: "2.0.4",
    parent: "2.0",
    name: "Cyprus RMS Online",
    tooltipHeader: "Project Details",
    tooltip: [
      ["Project", "Cyprus - Tax For All"],
      [
        "Summary",
        "Cyprus - Tax For All, is the DataTorque's first multilingual RMS online web version. </br> TFA allows taxpayers to file their Tax Returns and check their outstanding or refunds due for taxes.",
      ],
      ["Duration", "12 Months"],
      ["Role", "Team Lead/Tech operations manager"],
      ["Team Size", "14"],
      ["Project URL", "https://taxforall.mof.gov.cy/"],
    ],
  },
  {
    id: "2.0.4.10",
    parent: "2.0.4",
    name: "C#",
    tooltip: "With .net core 2.1",
  },
  {
    id: "2.0.4.20",
    parent: "2.0.4",
    name: "Sql Server 2016",
  },
  {
    id: "2.0.4.21",
    parent: "2.0.4",
    name: "Stored Procedures",
  },
  {
    id: "2.0.4.22",
    parent: "2.0.4",
    name: "SSRS",
    tooltip: "Sql Server Reporting Services",
  },
  {
    id: "2.0.4.30",
    parent: "2.0.4",
    name: "Asp.net MVC 5 & WebApi",
  },
  {
    id: "2.0.4.40",
    parent: "2.0.4",
    name: "VueJS",
  },
  {
    id: "2.0.4.50",
    parent: "2.0.4",
    name: "NUnit",
  },
  {
    id: "2.0.4.60",
    parent: "2.0.4",
    name: "Cypress IO",
    tooltip:
      "I was proud to pilot and introduce automated UI tests for RMS web and did integrate these UI tests in Build pipeline. These tests were real saviour and did help save a lot of costs, the team used to spend in past fixing newly introduced bugs in the shared code.",
  },
  {
    id: "2.0.4.70",
    parent: "2.0.4",
    name: "Razor pages",
  },
];

$(document).ready(function () {
  Highcharts.chart("projects-container", {
    title: {
      text: "Projects i have worked on!",
    },
    tooltip: {
      useShared: false,
      useHTML: true,
      style: {
        pointerEvents: "auto",
      },
      formatter: function () {
        return getTooltipHtml(this.point);
      },
    },
    series: [
      {
        type: "treegraph",
        data,

        marker: {
          symbol: "rect",
          width: "25%",
        },
        borderRadius: 10,
        dataLabels: {
          pointFormat: "{point.name}",
          style: {
            whiteSpace: "nowrap",
          },
        },
        levels: [
          {
            level: 1,
            levelIsConstant: false,
          },
          {
            level: 2,
            colorByPoint: true,
          },
          {
            level: 3,
            colorVariation: {
              key: "brightness",
              to: -0.5,
            },
          },
          {
            level: 4,
            colorVariation: {
              key: "brightness",
              to: 0.5,
            },
          },
        ],
      },
    ],
  });
});

function getTooltipHtml(point) {
  if (!point.tooltipHeader && !Array.isArray(point.tooltip)) {
    return point.tooltip || point.name;
  }

  const headerTemplate = "<table>";
  const headerRowTemplate = '<tr><th colspan="2">{0}<hr></th></tr>';
  const rowTemplate = "<tr><td><b>{0}&nbsp;</b></td><td>{1}</td></tr>";
  const rowLinkTemplate =
    "<tr><td><b>{0}&nbsp;</b></td><td><a href='{1}' style='cursor: pointer;' target='_blank'>Click me</a></td></tr>";
  const footerTemplate = "</table>";

  var tooltipHtml = headerTemplate;
  var headerRow =
    (point.tooltipHeader &&
      headerRowTemplate.replace("{0}", point.tooltipHeader)) ||
    "";

  tooltipHtml += headerRow;

  for (i = 0; i < point.tooltip.length; i++) {
    var template =
      point.tooltip[i][0].toLowerCase() == "project url"
        ? rowLinkTemplate
        : rowTemplate;

    var row = template
      .replace("{0}", point.tooltip[i][0])
      .replace("{1}", point.tooltip[i][1]);

    tooltipHtml += row;
  }

  return tooltipHtml + footerTemplate;
}

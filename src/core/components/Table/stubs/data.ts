const data = [
  {
    _id:
      "5fc883a6d1b395e50305c0ac5fc883a6d1b395e50305c0ac5fc883a6d1b395e50305c0ac5fc883a6d1b395e50305c0ac",
    index: 0,
    balance: "$2,071.50",
    age: 31,
    eyeColor: "green",
    name: "Gracie Kirkland",
    gender: "female",
    company: "EQUICOM",
    email: "graciekirkland@equicom.com",
    phone: "+1 (955) 479-2559",
    address: "398 Pleasant Place, Strong, Puerto Rico, 6498",
    registered: "2015-11-24T02:54:09 -05:00",
    latitude: 14.601226,
    longitude: 72.225639
  },
  {
    _id: "5fc883a69dec431829807f13",
    index: 1,
    balance: "$2,283.73",
    age: 37,
    eyeColor: "brown",
    name: "Patrice Banks",
    gender: "female",
    company: "KANGLE",
    email: "patricebanks@kangle.com",
    phone: "+1 (809) 572-3482",
    address: "432 Newton Street, Itmann, Louisiana, 4955",
    registered: "2017-08-12T04:00:37 -05:00",
    latitude: 86.59926,
    longitude: -118.834206
  },
  {
    _id: "5fc883a627de4d04c7390f01",
    index: 2,
    balance: "$2,488.85",
    age: 34,
    eyeColor: "blue",
    name: "Delores Huber",
    gender: "female",
    company: "ZILODYNE",
    email: "deloreshuber@zilodyne.com",
    phone: "+1 (864) 454-3762",
    address: "255 Pineapple Street, Strykersville, Michigan, 698",
    registered: "2019-01-16T02:36:53 -05:00",
    latitude: -25.851669,
    longitude: -150.939363
  },
  {
    _id: "5fc883a6fa207bc9fab289c1",
    index: 3,
    balance: "$2,984.48",
    age: 28,
    eyeColor: "green",
    name: "Loretta Hurst",
    gender: "female",
    company: "EQUICOM",
    email: "lorettahurst@datagene.com",
    phone: "+1 (821) 401-2934",
    address: "457 Ivan Court, Nelson, Virginia, 5987",
    registered: "2019-09-02T03:43:16 -05:00",
    latitude: -82.918921,
    longitude: 16.459335
  },
  {
    _id: "5fc883a63ce095a87069fb1d",
    index: 4,
    balance: "$2,392.81",
    age: 30,
    eyeColor: "brown",
    name: "Summer Frazier",
    gender: "female",
    company: "KANGLE",
    email: "summerfrazier@maximind.com",
    phone: "+1 (881) 470-3815",
    address: "319 Dinsmore Place, Stewartville, New Mexico, 1683",
    registered: "2014-10-11T06:48:22 -05:00",
    latitude: -42.58596,
    longitude: -53.453164
  },
  {
    _id: "5fc883a609afcbc047564483",
    index: 5,
    balance: "$3,442.85",
    age: 20,
    eyeColor: "green",
    name: "Vaughan Black",
    gender: "male",
    company: "XLEEN",
    email: "vaughanblack@xleen.com",
    phone: "+1 (994) 440-2209",
    address: "641 Benson Avenue, Nettie, Guam, 8238",
    registered: "2014-10-28T07:31:49 -05:00",
    latitude: -73.707953,
    longitude: -26.946061
  },
  {
    _id: "5fc883a67d3116b8baf695b0",
    index: 6,
    balance: "$2,550.93",
    age: 29,
    eyeColor: "green",
    name: "Staci Sheppard",
    gender: "female",
    company: "EQUICOM",
    email: "stacisheppard@incubus.com",
    phone: "+1 (914) 405-3997",
    address: "525 Verona Place, Independence, New Hampshire, 339",
    registered: "2020-02-08T09:34:44 -05:00",
    latitude: -88.730503,
    longitude: -171.024991
  },
  {
    _id: "5fc883a62fb38279c1d6f5d1",
    index: 7,
    balance: "$2,479.03",
    age: 32,
    eyeColor: "green",
    name: "Brenda Chandler",
    gender: "female",
    company: "ZILODYNE",
    email: "brendachandler@xerex.com",
    phone: "+1 (921) 572-2870",
    address: "667 Montauk Avenue, Celeryville, Marshall Islands, 5739",
    registered: "2016-06-05T03:29:39 -05:00",
    latitude: 45.451427,
    longitude: 137.877151
  },
  {
    _id: "5fc883a6d5bad1e3012be789",
    index: 8,
    balance: "$1,851.65",
    age: 27,
    eyeColor: "brown",
    name: "Opal Holman",
    gender: "female",
    company: "KANGLE",
    email: "opalholman@pushcart.com",
    phone: "+1 (873) 448-3335",
    address: "792 Crystal Street, Brandywine, Iowa, 8577",
    registered: "2020-05-20T07:41:32 -05:00",
    latitude: 76.8296,
    longitude: -122.268685
  },
  {
    _id: "5fc883a6d41e1674d9ab8457",
    index: 9,
    balance: "$3,748.05",
    age: 22,
    eyeColor: "brown",
    name: "Rivas Ballard",
    gender: "male",
    company: "EQUICOM",
    email: "rivasballard@zaphire.com",
    phone: "+1 (984) 517-3784",
    address: "844 Ryerson Street, Fairacres, Kansas, 6350",
    registered: "2016-04-18T09:22:19 -05:00",
    latitude: -15.286175,
    longitude: 79.507864
  },
  {
    _id: "5fc883a6c0e6058a4061a300",
    index: 10,
    balance: "$1,669.90",
    age: 24,
    eyeColor: "green",
    name: "Bishop Britt",
    gender: "male",
    company: "MIXERS",
    email: "bishopbritt@mixers.com",
    phone: "+1 (839) 598-2984",
    address: "813 Matthews Place, Cucumber, Arkansas, 7360",
    registered: "2016-09-03T06:06:10 -05:00",
    latitude: -20.563645,
    longitude: -150.157139
  },
  {
    _id: "5fc883a655e358c36bf58dcf",
    index: 11,
    balance: "$2,343.55",
    age: 28,
    eyeColor: "blue",
    name: "Lara Avery",
    gender: "male",
    company: "ZILODYNE",
    email: "laraavery@futurity.com",
    phone: "+1 (936) 509-3214",
    address: "675 Sands Street, Bluetown, Northern Mariana Islands, 245",
    registered: "2017-02-17T06:50:47 -05:00",
    latitude: 27.373484,
    longitude: 3.421569
  },
  {
    _id: "5fc883a6d1be0269670e1cfc",
    index: 12,
    balance: "$1,869.59",
    age: 21,
    eyeColor: "green",
    name: "Autumn Burris",
    gender: "female",
    company: "EQUICOM",
    email: "autumnburris@vurbo.com",
    phone: "+1 (844) 515-2590",
    address: "874 Doone Court, Thermal, New York, 9089",
    registered: "2018-07-24T11:03:26 -05:00",
    latitude: -39.615133,
    longitude: 86.25359
  },
  {
    _id: "5fc883a67d73ea1890dbc980",
    index: 13,
    balance: "$3,355.50",
    age: 32,
    eyeColor: "blue",
    name: "Rita Bentley",
    gender: "female",
    company: "ZILODYNE",
    email: "ritabentley@globoil.com",
    phone: "+1 (800) 519-2998",
    address: "250 Love Lane, Mulino, Vermont, 2452",
    registered: "2018-08-11T10:55:44 -05:00",
    latitude: -61.352984,
    longitude: -47.030503
  },
  {
    _id: "5fc883a6f07692d43b307999",
    index: 14,
    balance: "$2,932.07",
    age: 40,
    eyeColor: "green",
    name: "Marci Mckee",
    gender: "female",
    company: "ZILODYNE",
    email: "marcimckee@comdom.com",
    phone: "+1 (844) 495-2938",
    address: "853 Ryder Avenue, Bentley, Minnesota, 9982",
    registered: "2015-02-09T02:54:07 -05:00",
    latitude: -40.951312,
    longitude: 0.698315
  },
  {
    _id: "5fc883a63bcbc92aa08573e8",
    index: 15,
    balance: "$1,577.75",
    age: 25,
    eyeColor: "brown",
    name: "Chrystal Lynn",
    gender: "female",
    company: "EQUICOM",
    email: "chrystallynn@snorus.com",
    phone: "+1 (925) 502-3964",
    address: "520 Florence Avenue, Guilford, West Virginia, 1929",
    registered: "2014-09-28T01:28:19 -05:00",
    latitude: -29.11756,
    longitude: -84.970535
  },
  {
    _id: "5fc883a6fdb0a25d8bd76eb5",
    index: 16,
    balance: "$2,466.09",
    age: 31,
    eyeColor: "blue",
    name: "Bruce Gilmore",
    gender: "male",
    company: "ZILODYNE",
    email: "brucegilmore@medicroix.com",
    phone: "+1 (825) 541-3645",
    address: "203 Lefferts Avenue, Kipp, Texas, 5423",
    registered: "2017-09-07T06:49:06 -05:00",
    latitude: -20.949418,
    longitude: -56.248984
  },
  {
    _id: "5fc883a67102556d4020ff88",
    index: 17,
    balance: "$1,785.33",
    age: 38,
    eyeColor: "brown",
    name: "Erma Randall",
    gender: "female",
    company: "EQUICOM",
    email: "ermarandall@zedalis.com",
    phone: "+1 (864) 426-2053",
    address: "808 Bills Place, Groveville, Maine, 6422",
    registered: "2016-09-23T03:29:23 -05:00",
    latitude: 68.912712,
    longitude: -16.971004
  },
  {
    _id: "5fc883a6c700ba4e8af32e8f",
    index: 18,
    balance: "$1,770.65",
    age: 35,
    eyeColor: "brown",
    name: "Hebert Mckay",
    gender: "male",
    company: "KANGLE",
    email: "hebertmckay@farmage.com",
    phone: "+1 (941) 414-2219",
    address: "475 Montieth Street, Sussex, Montana, 6340",
    registered: "2017-06-21T02:14:09 -05:00",
    latitude: 2.969348,
    longitude: 37.807672
  },
  {
    _id: "5fc883a6c0ef21a9e841c1a1",
    index: 19,
    balance: "$3,700.72",
    age: 39,
    eyeColor: "brown",
    name: "Guadalupe Conner",
    gender: "female",
    company: "ESCENTA",
    email: "guadalupeconner@escenta.com",
    phone: "+1 (954) 547-2784",
    address: "687 Karweg Place, Fillmore, Utah, 8685",
    registered: "2019-12-29T10:39:47 -05:00",
    latitude: 32.15425,
    longitude: -47.889741
  },
  {
    _id: "5fc883a60ebc302d225bec40",
    index: 20,
    balance: "$3,524.69",
    age: 28,
    eyeColor: "green",
    name: "Veronica Montgomery",
    gender: "female",
    company: "EQUICOM",
    email: "veronicamontgomery@phuel.com",
    phone: "+1 (931) 563-2786",
    address: "941 Ingraham Street, Salix, Palau, 3628",
    registered: "2019-07-03T08:04:47 -05:00",
    latitude: 32.874511,
    longitude: -160.373037
  },
  {
    _id: "5fc883a6dbb8454fcdb88952",
    index: 21,
    balance: "$1,487.30",
    age: 26,
    eyeColor: "blue",
    name: "Jackson Joyner",
    gender: "male",
    company: "KANGLE",
    email: "jacksonjoyner@quizmo.com",
    phone: "+1 (855) 460-2450",
    address: "618 Dorchester Road, Defiance, North Dakota, 1055",
    registered: "2017-08-29T04:15:49 -05:00",
    latitude: -10.660947,
    longitude: 4.722813
  },
  {
    _id: "5fc883a667972d4d21d41baf",
    index: 22,
    balance: "$2,627.27",
    age: 27,
    eyeColor: "brown",
    name: "Carlson Slater",
    gender: "male",
    company: "IZZBY",
    email: "carlsonslater@izzby.com",
    phone: "+1 (886) 507-3391",
    address: "735 Court Square, Bison, Alabama, 9965",
    registered: "2015-12-11T05:50:26 -05:00",
    latitude: -10.898271,
    longitude: -23.059602
  },
  {
    _id: "5fc883a6fa9a1c2ea71cd391",
    index: 23,
    balance: "$1,631.60",
    age: 23,
    eyeColor: "green",
    name: "Bridgett Murray",
    gender: "female",
    company: "EQUICOM",
    email: "bridgettmurray@nixelt.com",
    phone: "+1 (879) 568-3970",
    address: "515 Eagle Street, Kimmell, Connecticut, 3260",
    registered: "2014-09-20T04:39:02 -05:00",
    latitude: 60.046412,
    longitude: -70.658205
  },
  {
    _id: "5fc883a6cf97998a9db91515",
    index: 24,
    balance: "$2,242.79",
    age: 27,
    eyeColor: "green",
    name: "Hoffman Gallegos",
    gender: "male",
    company: "KANGLE",
    email: "hoffmangallegos@viagrand.com",
    phone: "+1 (858) 441-2429",
    address: "319 Dwight Street, Bainbridge, Oklahoma, 4544",
    registered: "2020-11-27T01:59:04 -05:00",
    latitude: 19.148893,
    longitude: 38.784871
  },
  {
    _id: "5fc883a6487cfeb1f4ddfe20",
    index: 25,
    balance: "$3,907.99",
    age: 27,
    eyeColor: "green",
    name: "Burgess Mcclure",
    gender: "male",
    company: "LOCAZONE",
    email: "burgessmcclure@locazone.com",
    phone: "+1 (849) 568-2137",
    address: "656 Fillmore Place, Delwood, South Dakota, 3296",
    registered: "2020-02-04T05:36:06 -05:00",
    latitude: -14.870729,
    longitude: -172.013947
  },
  {
    _id: "5fc883a60d6ef2bc4c25e7f0",
    index: 26,
    balance: "$1,629.33",
    age: 38,
    eyeColor: "blue",
    name: "Vickie Deleon",
    gender: "female",
    company: "EQUICOM",
    email: "vickiedeleon@ovium.com",
    phone: "+1 (912) 578-3728",
    address: "646 Sharon Street, Veyo, California, 6664",
    registered: "2017-03-31T05:42:33 -05:00",
    latitude: -11.071695,
    longitude: -139.259517
  },
  {
    _id: "5fc883a60bf4acd9d22df5cd",
    index: 27,
    balance: "$3,823.70",
    age: 28,
    eyeColor: "blue",
    name: "Hodges Kim",
    gender: "male",
    company: "KANGLE",
    email: "hodgeskim@miraclis.com",
    phone: "+1 (823) 520-3641",
    address: "892 Seabring Street, Cleary, Colorado, 2749",
    registered: "2019-04-09T01:31:24 -05:00",
    latitude: -39.300912,
    longitude: 111.436527
  },
  {
    _id: "5fc883a66edacf852a6b10bb",
    index: 28,
    balance: "$3,260.19",
    age: 39,
    eyeColor: "brown",
    name: "Nichole Bender",
    gender: "female",
    company: "QOT",
    email: "nicholebender@qot.com",
    phone: "+1 (931) 484-2474",
    address: "746 Rose Street, Dorneyville, Illinois, 2781",
    registered: "2015-05-05T09:16:21 -05:00",
    latitude: 70.687206,
    longitude: 142.397283
  },
  {
    _id: "5fc883a6fb47d5535f1ed600",
    index: 29,
    balance: "$1,095.32",
    age: 34,
    eyeColor: "brown",
    name: "Latonya Williams",
    gender: "female",
    company: "EQUICOM",
    email: "latonyawilliams@gallaxia.com",
    phone: "+1 (854) 442-2417",
    address: "875 Flatbush Avenue, Leming, Florida, 3028",
    registered: "2014-04-02T06:26:40 -05:00",
    latitude: -77.061469,
    longitude: -28.067689
  },
  {
    _id: "5fc883a6ce8b6134f65408e9",
    index: 30,
    balance: "$1,588.31",
    age: 20,
    eyeColor: "brown",
    name: "Tamra Hartman",
    gender: "female",
    company: "KANGLE",
    email: "tamrahartman@polaria.com",
    phone: "+1 (840) 491-3633",
    address: "430 Knight Court, Falconaire, South Carolina, 2976",
    registered: "2018-05-06T01:43:08 -05:00",
    latitude: -31.600248,
    longitude: 93.659657
  },
  {
    _id: "5fc883a631fdbbfc051109a2",
    index: 31,
    balance: "$3,974.43",
    age: 39,
    eyeColor: "brown",
    name: "Sanders Simon",
    gender: "male",
    company: "GEEKWAGON",
    email: "sanderssimon@geekwagon.com",
    phone: "+1 (966) 539-3722",
    address: "122 Tillary Street, Sultana, Hawaii, 2590",
    registered: "2019-03-18T01:12:08 -05:00",
    latitude: 69.33391,
    longitude: -141.755468
  },
  {
    _id: "5fc883a60329f700f35113ed",
    index: 32,
    balance: "$1,573.94",
    age: 33,
    eyeColor: "brown",
    name: "Leanna Nunez",
    gender: "female",
    company: "EQUICOM",
    email: "leannanunez@farmex.com",
    phone: "+1 (987) 554-2650",
    address: "325 Boerum Street, Forbestown, Washington, 9881",
    registered: "2015-08-23T08:35:45 -05:00",
    latitude: 76.288101,
    longitude: 98.331546
  },
  {
    _id: "5fc883a69d2d33829db614ea",
    index: 33,
    balance: "$1,386.69",
    age: 27,
    eyeColor: "brown",
    name: "Jillian Santana",
    gender: "female",
    company: "KANGLE",
    email: "jilliansantana@uniworld.com",
    phone: "+1 (883) 529-2817",
    address: "278 Hoyt Street, Darrtown, Virgin Islands, 3991",
    registered: "2019-07-04T09:12:41 -05:00",
    latitude: -64.261168,
    longitude: -149.543969
  },
  {
    _id: "5fc883a694da6f653a77a92a",
    index: 34,
    balance: "$3,241.04",
    age: 31,
    eyeColor: "blue",
    name: "Sargent Rush",
    gender: "male",
    company: "CYCLONICA",
    email: "sargentrush@cyclonica.com",
    phone: "+1 (971) 405-2430",
    address: "963 Duryea Place, Tryon, American Samoa, 6129",
    registered: "2015-05-20T10:13:31 -05:00",
    latitude: 50.00941,
    longitude: -28.187158,
    rowColor: "#E5F0FC"
  },
  {
    _id: "5fc883a69b29929987678500",
    index: 35,
    balance: "$1,856.76",
    age: 21,
    eyeColor: "brown",
    name: "Eugenia Soto",
    gender: "female",
    company: "EQUICOM",
    email: "eugeniasoto@krag.com",
    phone: "+1 (989) 430-2229",
    address: "725 Huntington Street, Ogema, Indiana, 3881",
    registered: "2015-02-13T08:00:11 -05:00",
    latitude: 52.175178,
    longitude: 36.64054
  },
  {
    _id: "5fc883a621c34a68a9a9cef9",
    index: 36,
    balance: "$2,819.99",
    age: 34,
    eyeColor: "brown",
    name: "Edwards Hogan",
    gender: "male",
    company: "KANGLE",
    email: "edwardshogan@portica.com",
    phone: "+1 (946) 540-2875",
    address: "582 Guernsey Street, Romeville, Wisconsin, 9555",
    registered: "2014-10-30T01:42:44 -05:00",
    latitude: -19.283934,
    longitude: 40.565553
  }
];

export default data;

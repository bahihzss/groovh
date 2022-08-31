import {OnDropPayload} from '../components/organisms/DataSourceInput'

export const performances: OnDropPayload = {
  'companyPerformances': [
    {
      'company': {
        'id': 'gohd',
        'name': '株式会社G.Oホールディングス',
        'billingHandleRate': 1.03,
        'receiptHandleRate': 0.97,
      },
      'adCost': 120756,
      'receipt': 5103638,
      'billing': 949050
    },
    {
      'company': {
        'id': 'ktc',
        'name': '加島商事株式会社',
        'billingHandleRate': 1.05,
        'receiptHandleRate': 0.95,
      },
      'adCost': 27391,
      'receipt': 6731210,
      'billing': 1055117
    }
  ],
  'brandPerformances': [
    {
      'brand': {
        'id': 'others',
        'name': 'Others',
        'companyId': 'gohd',
      },
      'adCost': 0,
      'grossReceipt': 0,
      'receipt': 0,
      'receiptHandle': 0,
      'grossBilling': 0,
      'billing': 0,
      'billingHandle': 0,
      'profit': 0
    },
    {
      'brand': {
        'id': 'smarttap',
        'name': 'SmartTap',
        'companyId': 'ktc',
      },
      'adCost': 27391,
      'grossReceipt': 7085485,
      'receipt': 6731210,
      'receiptHandle': 354275,
      'grossBilling': 1004874,
      'billing': 1055117,
      'billingHandle': -50243,
      'profit': 5676093
    },
    {
      'brand': {
        'id': 'mens-null',
        'name': 'NULL',
        'companyId': 'gohd',
      },
      'adCost': 66197,
      'grossReceipt': 1581272,
      'receipt': 1533833,
      'receiptHandle': 47439,
      'grossBilling': 264215,
      'billing': 272141,
      'billingHandle': -7926,
      'profit': 1261692
    },
    {
      'brand': {
        'id': 'defend-future',
        'name': 'Defend Future',
        'companyId': 'gohd',
      },
      'adCost': 265,
      'grossReceipt': 463480,
      'receipt': 449575,
      'receiptHandle': 13905,
      'grossBilling': 68131,
      'billing': 70174,
      'billingHandle': -2043,
      'profit': 379401
    },
    {
      'brand': {
        'id': 'iina-style',
        'name': 'iina-style',
        'companyId': 'gohd',
      },
      'adCost': 0,
      'grossReceipt': 38480,
      'receipt': 37325,
      'receiptHandle': 1155,
      'grossBilling': 5262,
      'billing': 5419,
      'billingHandle': -157,
      'profit': 31906
    },
    {
      'brand': {
        'id': 'fixit',
        'name': 'FIXIT',
        'companyId': 'gohd',
      },
      'adCost': 54294,
      'grossReceipt': 3153504,
      'receipt': 3058898,
      'receiptHandle': 94606,
      'grossBilling': 579089,
      'billing': 596461,
      'billingHandle': -17372,
      'profit': 2462437
    },
    {
      'brand': {
        'id': 'nalc',
        'name': 'NALC',
        'companyId': 'gohd',
      },
      'adCost': 0,
      'grossReceipt': 0,
      'receipt': 0,
      'receiptHandle': 0,
      'grossBilling': 0,
      'billing': 0,
      'billingHandle': 0,
      'profit': 0
    },
    {
      'brand': {
        'id': 'fafra',
        'name': 'fafra',
        'companyId': 'gohd',
      },
      'adCost': 0,
      'grossReceipt': 24750,
      'receipt': 24007,
      'receiptHandle': 743,
      'grossBilling': 4714,
      'billing': 4855,
      'billingHandle': -141,
      'profit': 19152
    },
    {
      'brand': {
        'id': 'aimmx',
        'name': 'Aimmx',
        'companyId': 'gohd',
      },
      'adCost': 0,
      'grossReceipt': 0,
      'receipt': 0,
      'receiptHandle': 0,
      'grossBilling': 0,
      'billing': 0,
      'billingHandle': 0,
      'profit': 0
    },
    {
      'brand': {
        'id': 'weedy',
        'name': 'WeeDY',
        'companyId': 'gohd',
      },
      'adCost': 0,
      'grossReceipt': 0,
      'receipt': 0,
      'receiptHandle': 0,
      'grossBilling': 0,
      'billing': 0,
      'billingHandle': 0,
      'profit': 0
    }
  ]
}
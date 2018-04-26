export const Functions = {
  functions: {
    function: [
      {
        id: '100000020000',
        name: '后台功能',
        type: 'folder',
        description: '后台功能',
        functions: {
          'function': [
            {
              id: '100000020200',
              name: '案件审查',
              uri: '/caseCheck',
              type: '',
              description: '案件审查',
              params: {menuicon: '../../static/images/caseCheck/caseCheck.png', testObj: ''},
              functions: {
                'function': [
                  {
                    id: '100000020200',
                    name: '阅卷审查',
                    uri: '/caseCheck/easy/readCheck',
                    type: '',
                    description: '阅卷审查'
                  }
                ]
              }
            },
            {
              id: '100000020200',
              name: '出庭公诉',
              uri: '/court',
              type: '',
              description: '出庭公诉',
              params: {menuicon: '../../static/images/court/court.png', testObj: ''}
            },
            {
              id: '100000020200',
              name: '裁判结果审查',
              uri: '/judgment',
              type: '',
              description: '裁判结果审查',
              params: {menuicon: '../../static/images/judgment/judgment.png', testObj: ''}
            },
            {
              id: '100000020200',
              name: '辅助办案工具',
              uri: '/tools',
              type: '',
              description: '辅助办案工具',
              params: {menuicon: '../../static/images/tools/tools.png', testObj: ''}
            },
            {
              id: '100000020200',
              name: '后台管理',
              uri: '/manage',
              type: '',
              description: '后台管理',
              params: {menuicon: '../../static/images/manage/manage.png', testObj: ''}
            }
          ]
        }
      }
    ]
  }
}

import * as React from 'react';
import styles from './NwcTasksForms.module.scss';

import { INwcTasksFormsProps } from './INwcTasksFormsProps';
import { INwcTasksFormsState } from './INwcTasksFormsState';

import {
  DetailsList,
  IColumn,
  Label,
  Pivot,
  PivotItem,
  SelectionMode,
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react';

import { INintexTask } from '../../../models/INintexTask';
import { INintexForm } from '../../../models/INintexForm';
import createAuth0Client, { Auth0Client, IdToken } from '@auth0/auth0-spa-js';
import { AppSettings } from '../../../AppSettings';
import moment = require('moment');

export default class NwcTasksForms extends React.Component<INwcTasksFormsProps, INwcTasksFormsState> {

  protected auth0: Auth0Client = undefined;

  public constructor(props: INwcTasksFormsProps) {
    super(props);

    const nwcTasksColumns: IColumn[] = [
      {
        key: 'column1',
        name: 'Name',
        fieldName: 'name',
        minWidth: 150,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: 'string',
        onColumnClick: this._onTasksColumnClick
      },
      {
        key: 'column2',
        name: 'Description',
        fieldName: 'description',
        minWidth: 150,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: 'string',
        onColumnClick: this._onTasksColumnClick
      },
      {
        key: 'column3',
        name: 'Workflow name',
        fieldName: 'workflowName',
        minWidth: 150,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: 'string',
        onColumnClick: this._onTasksColumnClick
      },
      {
        key: 'column4',
        name: 'Status',
        fieldName: 'status',
        minWidth: 100,
        maxWidth: 120,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: 'string',
        onRender: (item) => {
          if (item.status) {
            // uppercase for 1st letter
            let displayText: string = item.status;
            displayText = displayText.charAt(0).toUpperCase() + displayText.slice(1);
            return <span>{displayText}</span>;
          } else {
            return <span></span>;
          }
        },
        onColumnClick: this._onTasksColumnClick
      },
      {
        key: 'column5',
        name: 'Date created',
        fieldName: 'createdDate',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: 'date',
        onRender: (item) => {
          if (item.createdDate) {
            return <span>{getFormattedLocalDateTime(item.createdDate)}</span>;
          } else {
            return <span></span>;
          }
        },
        onColumnClick: this._onTasksColumnClick
      },
      {
        key: 'column6',
        name: 'Date due',
        fieldName: 'dueDate',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: 'date',
        onRender: (item) => {
          if (item.dueDate) {
            return <span>{getFormattedLocalDateTime(item.dueDate)}</span>;
          } else {
            return <span></span>;
          }
        },
        onColumnClick: this._onTasksColumnClick
      },
      {
        key: 'column7',
        name: 'Task form',
        fieldName: 'taskAssignments',
        minWidth: 150,
        maxWidth: 200,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: 'string',
        onRender: (item) => {
          if (item.taskAssignments) {
            var task = item.taskAssignments[0];
            if ((task.urls) && (task.urls.formUrl)) {
              return <a target='_blank' href={task.urls.formUrl}>View Task Form</a>;
            }
          }
        },
        onColumnClick: this._onTasksColumnClick
      }
    ];

    const nwcFormsColumns: IColumn[] = [
      {
        key: 'column1',
        name: 'Name',
        fieldName: 'name',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: 'string',
        onRender: (item) => {
          // get the displayname from form - or - from the workflow, if the formname is empty
          let displayText: string = '';

          if (item.name && item.name !== '') {
            displayText = item.name;
          } else {
            displayText = item.workflow.name;
          }

          if (item.urls) {
            return <a target='_blank' href={item.urls.formUrl}>{displayText}</a>;
          } else {
            return <span>{item.name}</span>;
          }
        },
        onColumnClick: this._onFormsColumnClick
      },
      {
        key: 'column2',
        name: 'Description',
        fieldName: 'description',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: 'string',
        onColumnClick: this._onFormsColumnClick
      },
      {
        key: 'column3',
        name: 'Last Modified',
        fieldName: 'lastModified',
        minWidth: 210,
        maxWidth: 350,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        data: 'string',
        onRender: (item) => {
          if (item.lastModified) {
            return <span>{getFormattedLocalDateTime(item.lastModified)}</span>;
          } else {
            return <span></span>;
          }
        },
        onColumnClick: this._onFormsColumnClick
      }
    ];

    this.state = {
      nwcTasks: [],
      tasksColumns: nwcTasksColumns,
      tasksLoading: false,
      nwcForms: [],
      formsColumns: nwcFormsColumns,
      formsLoading: false
    };
  }

  public componentDidMount(): void {

    // if NOT needing config settings - ie. assuming webpart properties are filled in
    if (!this.props.needsConfiguration) {
      this.getTasks();
      this.getForms();
    } else {
      this.state = {
        ...this.state,
        nwcTasks: _sampleTasks(),
        nwcForms: _sampleForms()
      };
    }
  }

  public render(): React.ReactElement<INwcTasksFormsProps> {
    return (
      <div className={styles.nwcTasksForms}>
        <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>Open Activities</Label>
        <Pivot>
          {this.renderForms()}
          {this.renderTasks()}
        </Pivot>
      </div>
    );
  }

  // =====================================================================================================
  // API functionality - get Tasks and Forms
  // =====================================================================================================

  // need to determine geo-region / url
  private getGeoPrefixUrl = (idToken: IdToken) => {
    // check the token from auth0
    const apiUrl: string = idToken['http://ntx.identity/api-uri'];
    return apiUrl;
  }

  // setup the auth connection object
  private configureClient = async () => {

    this.auth0 = await createAuth0Client({
      domain: AppSettings.domain,               // from config appSettings
      client_id: this.props.clientId,           // from webpart property
      audience: AppSettings.audience,           // from config appSettings
      redirect_uri: window.location.origin,     // current page
      cacheLocation: 'localstorage',
      scope: 'tenant_name_' + this.props.tenantName     // from webpart property
    });

    const isAuthenticated: boolean = await this.auth0.isAuthenticated();
    if (!isAuthenticated) {
      await this.auth0.loginWithPopup();
    }
  }

  // call API to load list of tasks
  private getTasks = async () => {

    await this.configureClient();

    const isAuthenticated: boolean = await this.auth0.isAuthenticated();

    if (isAuthenticated) {

      // set state to LOADING for TASKS
      this.state = {
        ...this.state,
        tasksLoading: true
      };
      this.forceUpdate();

      const token: string = await this.auth0.getTokenSilently();
      const idToken: IdToken = await this.auth0.getIdTokenClaims();

      // startDate, 90 days before TODAY
      var startdate = moment();
      startdate = startdate.subtract(90, "days");

      // format for REST call to Tasks
      var fromDate = startdate.format("YYYY-MM-YYT00:00:00Z");

      // https://developer.nintex.com/docs/nc-api-docs/9dedadb170913-list-tasks
      let tasksUrl: string = this.getGeoPrefixUrl(idToken) + '/workflows/v2/tasks';
      tasksUrl += '?status=active';
      tasksUrl += '&from=' + fromDate;

      console.log(tasksUrl);

      fetch(tasksUrl, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'accept': 'application/json',
          'authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.statusText);
          }
        })
        .then(json => {
          if (json.tasks) {
            this.state = {
              ...this.state,
              nwcTasks: json.tasks,
              tasksLoading: false
            };
            this.forceUpdate();
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  // call API to load list of forms
  private getForms = async () => {

    await this.configureClient();

    const isAuthenticated: boolean = await this.auth0.isAuthenticated();

    if (isAuthenticated) {

      // set state to LOADING for FORMS
      this.state = {
        ...this.state,
        formsLoading: true
      };
      this.forceUpdate();

      const token: string = await this.auth0.getTokenSilently();
      const idToken: IdToken = await this.auth0.getIdTokenClaims();

      const formsUrl: string = this.getGeoPrefixUrl(idToken) + '/workflows/v1/forms';
      console.log(formsUrl);

      fetch(formsUrl, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'accept': 'application/json',
          'authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.statusText);
          }
        })
        .then(json => {
          if (json.forms) {
            this.state = {
              ...this.state,
              nwcForms: json.forms,
              formsLoading: false
            };
            this.forceUpdate();
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  // =====================================================================================================
  // UI functionality - render links & outcomes
  // =====================================================================================================

  private _onTasksColumnClick = (event: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { tasksColumns } = this.state;
    let { nwcTasks } = this.state;
    let isSortedDescending: boolean = column.isSortedDescending;

    // If we’ve sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    nwcTasks = _copyAndSort(nwcTasks, column.fieldName!, isSortedDescending);

    this.state = {
      ...this.state,
      nwcTasks: nwcTasks,
      tasksColumns: tasksColumns.map(col => {
        col.isSorted = col.key === column.key;
        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }
        return col;
      })
    };
  }

  private _onFormsColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { formsColumns } = this.state;
    let { nwcForms } = this.state;
    let isSortedDescending: boolean = column.isSortedDescending;

    // If we’ve sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    nwcForms = _copyAndSort(nwcForms, column.fieldName!, isSortedDescending);

    this.state = {
      ...this.state,
      nwcForms: nwcForms,
      formsColumns: formsColumns.map(col => {
        col.isSorted = col.key === column.key;
        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }
        return col;
      })
    };
  }

  private renderForms = () => {
    if (this.state.nwcForms.length > 0) {
      return <PivotItem linkText='Form' itemCount={this.state.nwcForms.length}  >
        {this.state.formsLoading ?
          <Spinner size={SpinnerSize.xSmall} />
          :
          <DetailsList
            items={this.state.nwcForms}
            selectionMode={SelectionMode.none}
            columns={this.state.formsColumns}
            isHeaderVisible={true} />
        }
      </PivotItem>;
    } else {
      // empty
      return <PivotItem linkText='Form' >
        {this.state.formsLoading ?
          <Spinner size={SpinnerSize.xSmall} />
          :
          <Label style={{ marginLeft: '10px', marginTop: '12px' }}>No Forms Found</Label>
        }
      </PivotItem>;
    }
  }

  private renderTasks = () => {
    if (this.state.nwcTasks.length > 0) {
      return <PivotItem linkText='Task' itemCount={this.state.nwcTasks.length}  >
        {this.state.tasksLoading ?
          <Spinner size={SpinnerSize.xSmall} />
          :
          <DetailsList
            items={this.state.nwcTasks}
            selectionMode={SelectionMode.none}
            columns={this.state.tasksColumns}
            isHeaderVisible={true}
          />
        }
      </PivotItem>;
    } else {
      // empty
      return <PivotItem linkText='Task'  >
        {this.state.tasksLoading ?
          <Spinner size={SpinnerSize.xSmall} />
          :
          <Label style={{ marginLeft: '10px', marginTop: '12px' }}>No Tasks Found</Label>
        }
      </PivotItem>;
    }
  }

}

// =====================================================================================================
// auxiliary functions - out of the components
// =====================================================================================================

function getFormattedLocalDateTime(inputDateTime: string): string {

  const utcDateTime: Date = new Date(inputDateTime);
  const localDateTime: Date = new Date(utcDateTime.getTime() - (utcDateTime.getTimezoneOffset() * 60000));

  const day: string = localDateTime.toLocaleDateString('en-US', { day: 'numeric' });
  const month: string = localDateTime.toLocaleDateString('en-US', { month: 'short' });
  const year: string = localDateTime.toLocaleDateString('en-US', { year: 'numeric' });
  const formattedDate: string = (day + ' ' + month + ' ' + year);

  let hours: string = localDateTime.getUTCHours().toString();
  if (hours.length === 1) {
    hours = '0' + hours;
  }

  let mins: string = localDateTime.getUTCMinutes().toString();
  if (mins.length === 1) {
    mins = '0' + mins;
  }
  const morningAfternoon: string = localDateTime.getUTCHours() >= 12 ? 'PM' : 'AM';
  const formattedTime: string = (hours + ':' + mins + ' ' + morningAfternoon);

  return formattedDate + ' - ' + formattedTime;

}

function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
  const key: any = columnKey as keyof T;
  return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}

// =====================================================================================================
// sample data (TESTING)
// =====================================================================================================

function _sampleForms(): INintexForm[] {
  return [
    {
      'id': '09858968-3eae-43a7-8a4f-060958a693a5',
      'workflow': {
        'name': 'Leave Request'
      },
      'name': 'Leave Request',
      'lastModified': '2021-09-12T03:51:11.211Z',
      'description': 'Vacation and Sick Leave',
      'urls': {
        'formUrl': 'https://tenantname.workflowcloud.com/forms/09858968-3eae-43a7-8a4f-060958a693a5'
      },
      'favourite': false
    },
    {
      'id': 'e70e8cdb-60e1-470a-9e91-a79982f434cf',
      'workflow': {
        'name': 'Expense Claim'
      },
      'name': 'Expense Claim',
      'lastModified': '2021-09-08T08:51:11.211Z',
      'description': 'Reimbursements for employee spending',
      'urls': {
        'formUrl': 'https://tenantname.workflowcloud.com/forms/e70e8cdb-60e1-470a-9e91-a79982f434cf'
      },
      'favourite': false
    }
  ];

}

function _sampleTasks(): INintexTask[] {
  return [
    {
      'id': '86383988744140750c2cb7aff467-42bb-99b6-55ac41b5fd19',
      'name': 'Review Monthly Expenses',
      'description': 'Review the expenses submitted for this month',
      'workflowName': 'Expense claim workflow',
      'status': 'active',
      'createdDate': '2021-09-12T03:51:11.211Z',
      'dueDate': '2021-09-21T13:06:25.911Z',
      taskAssignments: [
        {
          "status": "active",
          "assignee": "first.lastName@myCompany.com.au",
          "urls": {
              "formUrl": "https://tenantname.workflowcloud.com/task-forms/a8240c5c-1c80-5422-abd4-ade82bf5949d_5466bc56-dafa-5151-a87e-ebf2ccf4d4db"
          }
        }
      ]
    }
  ];

}

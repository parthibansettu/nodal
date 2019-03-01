import assert from 'assert';
import { Given, When, Then } from 'cucumber';
import axios from 'axios';
import TokenManager from '@athena/iam-service-token-manager';
import 'babel-core/register';
import 'babel-polyfill';
import yamlParser from '../../../utilities/yaml_parser';
import Action from '../../../utilities/web_action_methods';
import dateTime from 'date-time';

import Logger from '@athena/app-fabric-logger';
const logger = new Logger({
	colorize: true,
	prettyPrint: true,
});

browser.addCommand('getResponse', async function(endPointURL, reqId, accessToken){
	const response = await axios({
			method: 'POST',
			url: `${endPointURL}${reqId}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			data: {
				type: 'CREATE',
				username: 'nhemendara',
			},
			timeout: 600000,
		});
		return response;
});

const iam = new TokenManager({
	clientId: '0oa5hgmqlgTZ6wwtc1t7',
	clientSecret: 'gTlyZO_v4-3kVQJK9XQ5BxLXGW0fiAXsazsV04_4',
	tokenEndpointUrl: 'https://athenahealthpoc.okta.com/oauth2/aus13kbtj4HAdI3451t7/v1/token',
	scopes: 'authops.all.all',
	logger,
});

Then(/^I submit requisition id to authops and verify whether it is successful$/, async function(){
	const token = await iam.getAccessToken();
	const createEndPoint = 'https://authops-dev.gateway.aws.athenahealth.com/authops/api/v1/events/requisition/';
	let response = await browser.getResponse(createEndPoint, fetched_requisition_id, token);
	assert.equal(response.status, 201, 'Create is done successfully');
	const data = response.data;
	const workitems = data.workItem;
	const workItemId = workitems[0].id;
	assert.ok(workitems, 'workitems are available');
	assert.ok(workItemId, 'workitem has an id');
	switch(response.status) {
		case 201:
			Action.logResult('Requisition Id has been submitted', 'Pass', dateTime());
			break;
		case 409:
			Action.logResult('Requisition Id has already been submitted', 'Warning', dateTime());
			break;
	}
});

When('the refresh end point is invoked', { timeout: 60 * 1000 }, async function() {
	const token = await iam.getAccessToken();
	const createEndPoint = 'https://authops-dev.gateway.aws.athenahealth.com/authops/api/v1/events/requisition/';
	const response = await axios({
		method: 'POST',
		url: `${createEndPoint}${this.requistionId}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		data: {
			type: 'REFRESH',
			username: 'nhemendara',
		},
	});
	this.response = response;
});

Then('the response status should have success', function() {
	assert.equal(this.response.status, 201, 'Create is done successfully');
	const data = this.response.data;
	assert.ok(data, 'got the data cleanly');
});
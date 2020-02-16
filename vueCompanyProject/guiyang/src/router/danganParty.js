/**
 * ###### Mon Jul 24 10:37:13 CST 2017
 * @name danganPartyRouter
 * @description 流动人员档案和人事代理党委路由
 * @author jinglf000
 *
 */

// 流动人员档案和人事代理党委 统一打包成 `group-danganParty` 包

// 流动人员档案
/* eslint-disable global-require */
const DanganPerson = r => require.ensure([], () => r(require('@/views/dangan/person')), 'group-danganParty');
const DanganHuji = r => require.ensure([], () => r(require('@/views/dangan/perhuji')), 'group-danganParty');
const DanganCompany = r => require.ensure([], () => r(require('@/views/dangan/company')), 'group-danganParty');
const DanganLette = r => require.ensure([], () => r(require('@/views/dangan/lette')), 'group-danganParty');
const DanganLetteApproval = r => require.ensure([], () => r(require('@/views/dangan/letteApproval')), 'group-danganParty');
const DanganLetteMeter = r => require.ensure([], () => r(require('@/views/dangan/letteMeter')), 'group-danganParty');
const DanganLetteProve = r => require.ensure([], () => r(require('@/views/dangan/letteProve')), 'group-danganParty');
const DanganService = r => require.ensure([], () => r(require('@/views/dangan/service')), 'group-danganParty');
const PoliExamService = r => require.ensure([], () => r(require('@/views/dangan/poliExamService')), 'group-danganParty');
const OtherService = r => require.ensure([], () => r(require('@/views/dangan/otherService')), 'group-danganParty');
const ServiceRecord = r => require.ensure([], () => r(require('@/views/dangan/serviceRecord')), 'group-danganParty');
const DanganServiceApproval = r => require.ensure([], () => r(require('@/views/dangan/serviceApproval')), 'group-danganParty');
const DanganServiceMeter = r => require.ensure([], () => r(require('@/views/dangan/serviceMeter')), 'group-danganParty');
const DanganServiceProve = r => require.ensure([], () => r(require('@/views/dangan/serviceProve')), 'group-danganParty');

// 人事代理党委
/* eslint-disable global-require */
const PartyPartyer = r => require.ensure([], () => r(require('@/views/party/partyer')), 'group-danganParty');
const PartyPartyerDetail = r => require.ensure([], () => r(require('@/views/party/partyerDetail')), 'group-danganParty');
const PartyThoughtReport = r => require.ensure([], () => r(require('@/views/party/thoughtReport')), 'group-danganParty');
const PartyThoughtReportDetail = r => require.ensure([], () => r(require('@/views/party/reportDetail')), 'group-danganParty');
const PartyThoughtType = r => require.ensure([], () => r(require('@/views/party/thoughtType')), 'group-danganParty');
const PartyMailBox = r => require.ensure([], () => r(require('@/views/party/mailBox')), 'group-danganParty');
const PartyMailReply = r => require.ensure([], () => r(require('@/views/party/mailReply')), 'group-danganParty');
const PartyOrgnaize = r => require.ensure([], () => r(require('@/views/party/orgnaize')), 'group-danganParty');
const PartyActiveManage = r => require.ensure([], () => r(require('@/views/party/activeManage')), 'group-danganParty');
const PartyActiveDetail = r => require.ensure([], () => r(require('@/views/party/activeDetail')), 'group-danganParty');
const PartyActiveEntry = r => require.ensure([], () => r(require('@/views/party/activeEntry')), 'group-danganParty');
const PartyPayment = r => require.ensure([], () => r(require('@/views/party/partyPay')), 'group-danganParty');
const PartyRelation = r => require.ensure([], () => r(require('@/views/party/relation')), 'group-danganParty');
const PartyRelationRecord = r => require.ensure([], () => r(require('@/views/party/relationRecord')), 'group-danganParty');
const PartyRelationDetail = r => require.ensure([], () => r(require('@/views/party/relationDetail')), 'group-danganParty');
const PartyRelationMeter = r => require.ensure([], () => r(require('@/views/party/relationMeter')), 'group-danganParty');

const danganRouters = [
	{
		path: '/dangan/person',
		name: 'danganPerson',
		meta: {
			tabName: '个人档案管理'
		},
		component: DanganPerson
	},
	{
		path: '/dangan/huji',
		name: 'danganHuji',
		meta: {
			tabName: '个人户籍'
		},
		component: DanganHuji
	},
	{
		path: '/dangan/company',
		name: 'danganCompany',
		meta: {
			tabName: '单位存档管理'
		},
		component: DanganCompany
	},
	{
		path: '/dangan/lette',
		name: 'danganLette',
		meta: {
			tabName: '调档函服务'
		},
		component: DanganLette
	},
	{
		path: '/dangan/letteApproval',
		name: 'danganLetteApproval',
		meta: {
			tabName: '调档函审核',
			noTabs: true,
			parentRoute: 'danganLette'
		},
		component: DanganLetteApproval
	},
	{
		path: '/dangan/letteMeter',
		name: 'danganLetteMeter',
		meta: {
			tabName: '调档函编辑',
			noTabs: true,
			parentRoute: 'danganLette'
		},
		component: DanganLetteMeter
	},
	{
		path: '/dangan/letteProve',
		name: 'danganLetteProve',
		meta: {
			tabName: '调档函综合查询'
		},
		component: DanganLetteProve
	},
	{
		path: '/dangan/service',
		name: 'danganService',
		meta: {
			tabName: '托管证明服务'
		},
		component: DanganService
	},
	{
		path: '/dangan/poliExamService',
		name: 'poliExamService',
		meta: {
			tabName: '政审证明服务'
		},
		component: PoliExamService
	},
	{
		path: '/dangan/otherService',
		name: 'otherService',
		meta: {
			tabName: '其他证明服务'
		},
		component: OtherService
	},
	{
		path: '/dangan/serviceRecord',
		name: 'serviceRecord',
		meta: {
			tabName: '证明记录查询'
		},
		component: ServiceRecord
	},
	{
		path: '/dangan/serviceApproval',
		name: 'danganServiceApproval',
		meta: {
			tabName: '证明审核',
			noTabs: true,
			parentRoute: 'danganService'
		},
		component: DanganServiceApproval
	},
	{
		path: '/dangan/serviceMeter',
		name: 'danganServiceMeter',
		meta: {
			tabName: '证明材料编辑',
			noTabs: true,
			parentRoute: 'danganService'
		},
		component: DanganServiceMeter
	},
	{
		path: '/dangan/serviceProve',
		name: 'danganServiceProve',
		meta: {
			tabName: '证明材料综合查询'
		},
		component: DanganServiceProve
	}
];

const partyRouters = [
	{
		path: '/party/partyer',
		name: 'partyPartyer',
		meta: {
			tabName: '党员信息'
		},
		component: PartyPartyer
	},
	{
		path: '/party/partyerDetail',
		name: 'partyPartyerDetail',
		meta: {
			tabName: '党员信息详情',
			noTabs: true,
			parentRoute: 'partyPartyer'
		},
		component: PartyPartyerDetail
	},
	{
		path: '/party/thoughtReport',
		name: 'partyThoughtReport',
		meta: {
			tabName: '思想汇报'
		},
		component: PartyThoughtReport
	},
	{
		path: '/party/reportDetail',
		name: 'reportDetail',
		meta: {
			tabName: '思想汇报详情',
			noTabs: true,
			parentRoute: 'partyThoughtReport'
		},
		component: PartyThoughtReportDetail
	},
	{
		path: '/party/thoughtType',
		name: 'partyThoughtType',
		meta: {
			tabName: '思想汇报类别'
		},
		component: PartyThoughtType
	},
	{
		path: '/party/mailBox',
		name: 'partyMailBox',
		meta: {
			tabName: '党员信箱'
		},
		component: PartyMailBox
	},
	{
		path: '/party/mailReply',
		name: 'partyMailReply',
		meta: {
			tabName: '回复留言',
			noTabs: true,
			parentRoute: 'partyMailBox'
		},
		component: PartyMailReply
	},
	{
		path: '/party/orgnaize',
		name: 'partyOrgnaize',
		meta: {
			tabName: '党组织维护'
		},
		component: PartyOrgnaize
	},
	{
		path: '/party/activeManage',
		name: 'partyActiveManage',
		meta: {
			tabName: '活动管理'
		},
		component: PartyActiveManage
	},
	{
		path: '/party/activeDetail',
		name: 'partyActiveDetail',
		meta: {
			tabName: '活动详情',
			noTabs: true,
			parentRoute: 'activeManage'
		},
		component: PartyActiveDetail
	},
	{
		path: '/party/activeEntry',
		name: 'partyActiveEntry',
		meta: {
			tabName: '报名花名册',
			noTabs: true,
			parentRoute: 'activeManage'
		},
		component: PartyActiveEntry
	},
	{
		path: '/party/partyPay',
		name: 'partyPayment',
		meta: {
			tabName: '党员缴费'
		},
		component: PartyPayment
	},
	{
		path: '/party/relation',
		name: 'partyRelation',
		meta: {
			tabName: '党组织关系证明'
		},
		component: PartyRelation
	},
	{
		path: '/party/relationRecord',
		name: 'partyRelationRecord',
		meta: {
			tabName: '证明记录查询'
		},
		component: PartyRelationRecord
	},
	{
		path: '/party/relationDetail',
		name: 'partyRelationDetail',
		meta: {
			tabName: '党组织关系审核',
			noTabs: true,
			parentRoute: 'partyRelation'
		},
		component: PartyRelationDetail
	},
	{
		path: '/party/relationMeter',
		name: 'partyRelationMeter',
		meta: {
			tabName: '证明材料编辑',
			noTabs: true,
			parentRoute: 'partyRelation'
		},
		component: PartyRelationMeter
	}
];

export default danganRouters.concat(partyRouters);

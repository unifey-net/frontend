import React from "react"
import { Tabs, Spin, Alert } from "antd"
import CommunityReports from "../../../components/community/moderate/reports/CommunityReports"
import CommunityRoles from "../../../components/community/moderate/roles/CommunityRoles"
import { useParams } from "react-router-dom"
import { useCommunity } from "../../../api/community/CommunityUtil"
import { LoadingOutlined } from "@ant-design/icons"
import GeneralSettings from "../../../components/community/moderate/general/GeneralSettings"
import useQueryParameterTabs from "../../../components/useQueryParameterTabs"
import NotFound from "../../NotFound"
import CommunityRules from "../../../components/community/moderate/rules/CommunityRules"
import { COMPLETE, ERROR, LOADING } from "../../../api/util/Status"

const { TabPane } = Tabs

type UrlProps = {
    name: string
}

export default () => {
    const { name } = useParams() as UrlProps

    let [community, status] = useCommunity(name)
    let [activeTab, setActiveTab] = useQueryParameterTabs()

    if (community && 3 > community.selfRole) return NotFound()

    return (
        <>
            {status.status === COMPLETE && community !== null && (
                <>
                    <h1 className="text-3xl lg:text-4xl text-center">
                        {community.community.name}
                    </h1>

                    <div className="flex items-center flex-col justify-center">
                        <div className="max-w-sm md:max-w-md lg:max-w-6xl variable-min-w">
                            <Tabs
                                activeKey={activeTab}
                                onChange={tab => setActiveTab(tab)}
                                tabPosition="left"
                            >
                                <TabPane tab="General Settings" key="1">
                                    <GeneralSettings community={community!!} />
                                </TabPane>
                                <TabPane tab="Reports" key="2">
                                    <CommunityReports community={community!!} />
                                </TabPane>
                                <TabPane tab="Roles" key="3">
                                    <CommunityRoles community={community!!} />
                                </TabPane>
                                <TabPane tab="Rules" key="4">
                                    <CommunityRules community={community!!} />
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </>
            )}

            {status.status === LOADING && (
                <div className="flex justify-center">
                    <div className="flex flex-col">
                        <Spin indicator={<LoadingOutlined />} />
                        <p>If this page doesn't load, try reloading. (F5)</p>
                    </div>
                </div>
            )}

            {status.status === ERROR && (
                <Alert
                    message="Uh oh."
                    description={status.message}
                    showIcon
                    type="error"
                />
            )}
        </>
    )
}

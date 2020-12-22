import React from "react"
import { Tabs, Spin, Alert } from "antd"
import CommunityReports from "./reports/CommunityReports"
import CommunityRoles from "./roles/CommunityRoles"
import { useParams } from "react-router-dom"
import { useCommunity } from "../../../../api/community/CommunityUtil"
import { COMPLETE, LOADING, ERROR } from "../../../../api/ApiHandler"
import { LoadingOutlined } from "@ant-design/icons"
import GeneralSettings from "./general/GeneralSettings"
import useQueryParameterTabs from "../../../../components/useQueryParameterTabs"
import NotFound from "../../../NotFound"
import CommunityRules from "./rules/CommunityRules"

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

                    <div
                        className=""
                        style={{ marginLeft: "32rem", marginRight: "32rem" }}
                    >
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

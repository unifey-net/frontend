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
import styled from "styled-components"
import DefaultContainer from "../../../components/DefaultContainer"
import { media } from "../../../api/util/Media"

const { TabPane } = Tabs

type UrlProps = {
    name: string
}

const ModerateCommunityStyle = styled.div`
    div {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
`

const ModerateCommunity = () => {
    const { name } = useParams() as UrlProps

    let [community, status] = useCommunity(name)
    let [activeTab, setActiveTab] = useQueryParameterTabs()

    if (community && 3 > community.selfRole) return NotFound()

    if (status.status === LOADING) {
        return (
            <DefaultContainer>
                <Spin indicator={<LoadingOutlined />} />
            </DefaultContainer>
        )
    }

    if (status.status === ERROR || community === null) {
        return (
            <Alert
                message="Uh oh."
                description={status.message}
                showIcon
                type="error"
            />
        )
    }

    return (
        <ModerateCommunityStyle>
            <h1>
                {community.community.name}
            </h1>

            <div>
                <div>
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
        </ModerateCommunityStyle>
    )
}

export default ModerateCommunity
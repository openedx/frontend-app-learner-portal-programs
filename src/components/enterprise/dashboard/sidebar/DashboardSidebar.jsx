import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LayoutContext, SidebarBlock } from '../../../common/layout';
import { LoadingSpinner } from '../../../common/loading-spinner';
import { fetchOffers, Offer } from './offers';

class DashboardSidebar extends React.Component {
  static contextType = LayoutContext;

  componentDidMount() {
    this.props.fetchOffers();
  }

  renderOffers(offers) {
    return offers.map(({
      usageType,
      benefitValue,
      redemptionsRemaining,
      code,
      couponEndDate,
    }) => (
      <Offer
        usageType={usageType}
        benefitValue={benefitValue}
        redemptionsRemaining={redemptionsRemaining}
        code={code}
        couponEndDate={couponEndDate}
      />
    ));
  }

  renderLearningCoordinatorHelpText(enterpriseName, enterpriseEmail) {
    if (enterpriseEmail) {
      return (
        <a href={`mailto:${enterpriseEmail}`}>
          Contact your {enterpriseName} learning coordinator
        </a>
      );
    }
    return `Contact your ${enterpriseName} learning coordinator`;
  }

  render() {
    const { pageContext: { enterpriseName, enterpriseEmail } } = this.context;
    const {
      offers,
      isLoading,
    } = this.props;

    return (
      <>
        {isLoading && (
          <LoadingSpinner screenReaderText={`loading learning benefits for ${enterpriseName}`} />
        )}
        {offers.length > 0 && (
          <SidebarBlock title={`Learning Benefits from ${enterpriseName}`} className="mb-5">
            {this.renderOffers(offers)}
            <p>
              {this.renderLearningCoordinatorHelpText(enterpriseName, enterpriseEmail)}
              {' '}
              for more benefits.
            </p>
          </SidebarBlock>
        )}
        <SidebarBlock className="mb-5">
          <div className="mt-5">
            <h5>Need help?</h5>
            <p>
              For technical support, visit the
              {' '}
              <a href="https://support.edx.org/hc/en-us">edX Help Center</a>.
            </p>
            <p>
              To request more benefits or specific courses,
              {' '}
              {this.renderLearningCoordinatorHelpText(enterpriseName, enterpriseEmail)}.
            </p>
          </div>
        </SidebarBlock>
      </>
    );
  }
}

DashboardSidebar.defaultProps = {
  fetchOffers: null,
  isLoading: false,
  offers: [],
};

DashboardSidebar.propTypes = {
  fetchOffers: PropTypes.func,
  isLoading: PropTypes.bool,
  offers: PropTypes.arrayOf(PropTypes.shape({
    usageType: PropTypes.string,
    benefitValue: PropTypes.number,
    redemptionsRemaining: PropTypes.number,
    code: PropTypes.string,
    couponEndDate: PropTypes.string,
  })),
};

const mapStateToProps = state => ({
  isLoading: state.offers.loading,
  offers: state.offers.offers,
});

const mapDispatchToProps = dispatch => ({
  fetchOffers: () => dispatch(fetchOffers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSidebar);

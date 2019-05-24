import { connect } from 'react-redux';
import MainContent from '../../components/DashboardHome/MainContent';
import { clearProgramEnrollmentOverview, fetchProgramEnrollmentOverview } from '../../data/actions/programEnrollments';

const mapStateToProps = state => ({
  loading: state.programEnrollments.loading,
  error: state.programEnrollments.error,
  courseRuns: state.programEnrollments.data.course_runs,
});

const mapDispatchToProps = dispatch => ({
  fetchProgramEnrollmentOverview: (programUUID) => {
    dispatch(fetchProgramEnrollmentOverview(programUUID));
  },
  clearProgramEnrollmentOverview: () => {
    dispatch(clearProgramEnrollmentOverview());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);

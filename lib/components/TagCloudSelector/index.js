import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { Button } from 'components/Button';
import TagChip from 'components/TagChip';
import * as TCU from './TagCloudUtils';
import './TagCloudSelector.scss';

class TagCloudSelector extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleTagSelect = this.handleTagSelect.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleTagSelect(tagData) {
    if (!this.props.onSelect) return;

    const activeTags = new Set(this.props.selectedTags);
    if (!activeTags.delete(tagData.id)) {
      activeTags.add(tagData.id);
    }
    const selectedTagArray = [...activeTags.values()];
    this.props.onSelect(selectedTagArray, this.props.name);
  }

  handleClear() {
    this.props.onSelect([], this.props.name);
  }

  render() {
    const {
      className,
      tagClass,
      tagOptions,
      selectedTags,
      onSelect,
      sizeRelativeToCount
    } = this.props;
    const activeTags = new Set(selectedTags);
    const hasSelect = !!onSelect;
    const canClear = activeTags.size > 0 && hasSelect;

    return (
      <div className={classNames('tag-cloud', className)}>
        {hasSelect && (
          <div className={classNames('flex', 'right')}>
            <Button disabled={!canClear} onClick={this.handleClear}>
              Clear
            </Button>
          </div>
        )}
        <div className={classNames('flex', 'wrap')}>
          {tagOptions.map((chip) => {
            const size = sizeRelativeToCount
              ? TCU.getChipSize(tagOptions, chip.count)
              : null;

            return (
              <TagChip
                key={chip.id}
                className={tagClass}
                isActive={activeTags.has(chip.id)}
                data={chip}
                onClick={this.handleTagSelect}
                chipSize={size}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

TagCloudSelector.defaultProps = {
  name: 'tag-cloud',
  selectedTags: []
};

TagCloudSelector.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  tagClass: PropTypes.string,
  tagOptions: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number,
      name: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    })
  ).isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.number),
  onSelect: PropTypes.func,
  sizeRelativeToCount: PropTypes.bool
};

export default TagCloudSelector;

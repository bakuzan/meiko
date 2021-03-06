import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';

import { Button } from './Button';
import TagChip from './TagChip';
import getTagChipSize from './utils/getTagChipSize';

import styles from './styles/TagCloudSelector';

class TagCloudSelector extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleTagSelect = this.handleTagSelect.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleTagSelect(tagData) {
    if (!this.props.onSelect) {
      return;
    }

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
      sizeRelativeToCount,
      sizes
    } = this.props;
    const activeTags = new Set(selectedTags);
    const hasSelect = !!onSelect;
    const canClear = activeTags.size > 0 && hasSelect;

    return (
      <div className={classNames('tag-cloud', styles.tagCloud, className)}>
        <div
          className={classNames('tag-cloud__options', styles.tagCloud__options)}
        >
          {tagOptions.map((chip) => {
            const size = sizeRelativeToCount
              ? getTagChipSize(tagOptions, chip.count, sizes)
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
        {hasSelect && (
          <div className={classNames('tag-cloud__actions', styles.actions)}>
            <Button
              className="tag-cloud__clear"
              btnStyle="primary"
              disabled={!canClear}
              onClick={this.handleClear}
            >
              Clear
            </Button>
          </div>
        )}
      </div>
    );
  }
}

TagCloudSelector.displayName = 'TagCloudSelector';
TagCloudSelector.defaultProps = {
  name: 'tag-cloud',
  selectedTags: [],
  sizes: {}
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
  sizeRelativeToCount: PropTypes.bool,
  sizes: PropTypes.shape({ min: PropTypes.number, max: PropTypes.number })
};

export default TagCloudSelector;

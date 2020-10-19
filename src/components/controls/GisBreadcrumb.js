import React from 'react';
import { Icon } from '@fluentui/react';
import { mergeStyles } from '@fluentui/react/lib/Styling';
const iconClass = mergeStyles({
    fontSize: 10
});
// const itemsWithHeading = [
//     { text: 'Files', key: 'Files', iconName: 'Home' },
//     { text: 'Folder 1', key: 'd1' },
//     // Generally, only the last item should ever be a heading.
//     // It would typically be h1 or h2, but we're using h4 here to better fit the structure of the page.
//     { text: 'Folder 2', key: 'd2', isCurrentItem: true },
// ];

const GisBreadcrumb = (props) => {
    var {items}=props;
    items=items??[];
    return (
        <div className='gis-breadcrumb'>
            <ul>
                {
                    items.map(
                        (item, index) => {
                            return (
                                <li key={index} >
                                    {
                                       (item.iconProps && item.iconProps.iconName && (!item.isCurrentItem||item.isHome)) ? <Icon iconName={item.iconProps.iconName} /> : null
                                    }
                                    {/* <span className={item.isCurrentItem?'current':''}>{item.text}</span> */}
                                    <span className={item.isCurrentItem ? 'current' : 'item'}>{item.name}</span>
                                    {
                                        item.isCurrentItem ? null : <Icon iconName='ChevronRight' className={iconClass} />
                                    }
                                </li>
                            )
                        }
                    )
                }
            </ul>
        </div>
    )
}
export default GisBreadcrumb;
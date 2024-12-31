import axios from 'axios';
import { parse } from 'node-html-parser';

// apiService.ts
let url_main: string = "https://voz.vn";

interface Subitem {
    title: string;
    link: string;
    thread: string;
    messages: string;
}

interface Threaditem {
    title: string;
    label: string;
    username_started: string;
    thread_started: string;
    replies_count: string;
    last_time_replies: string,
    last_time_username_replies: string,
    is_sticky: boolean,
    link: string,
    is_thread: true
}

const fetchHomePage = async () => {
    console.log("Processing homepage");

    let data: {
        section: string;
        data: Subitem[]
    }[] = [];

    try {
        const response = await axios.get(url_main);

        if (!response || !response.data) {
            throw new Error('No data returned from the homepage');
        }
        const root = parse(response.data);
        const block_category = root.querySelectorAll('.block.block--category.block--category');
        for (const category of block_category) {
            const section_title = category.querySelector('.block-header')?.text.trim() ?? '';
            const block_items = category.querySelector('.block-body')?.querySelectorAll('.node--depth2');
            if (!block_items) continue; // Skip if no items are found in this category 
            let sectionData: Subitem[] = [];
            for (const item of block_items) {
                const title = item.querySelector('.node-title')?.text.trim() ?? '';
                const link = item.querySelector('.node-title >a')?.getAttribute('href') ?? '';
                const thread = item.querySelectorAll('.pairs.pairs--inline >dd')[0]?.text.trim() ?? '';
                const messages = item.querySelectorAll('.pairs.pairs--inline >dd')[1]?.text.trim() ?? '';
                sectionData.push({ title, link, thread, messages });
            }

            if (section_title && sectionData.length > 0) {
                data.push({ section: section_title, data: sectionData });
            }
        }

        return data; // Return the parsed data

    } catch (error) {
        throw new Error('An unexpected error occurred, Error fetching homepage');
    }
};


const fetchSubitem = async (sub_link: string) => {
    try {
        console.log("Processing subitem")

        const response = await axios.get(url_main + sub_link)
        if (!response || !response.data) {
            throw new Error('No data returned from the subitem');
        }
        const root = parse(response.data);

        let data: {
            title: string,
            data: (Subitem | Threaditem)[]
        }[] = [];

        const subitems = root.querySelectorAll('.node--depth2.node--forum')
        const sectionData: Subitem[] = [];
        const threaditem: Threaditem[] = [];
        const is_thread = true
        // Extract the subitems
        for (const item of subitems) {
            const title = item.querySelector('.node-title')?.text.trim() ?? '';
            const link = item.querySelector('.node-title >a')?.getAttribute('href') ?? '';
            const thread = item.querySelectorAll('.pairs.pairs--inline >dd')[0]?.text.trim() ?? '';
            const messages = item.querySelectorAll('.pairs.pairs--inline >dd')[1]?.text.trim() ?? '';
            sectionData.push({ title, link, thread, messages })
        }
        
        if (sectionData.length > 0) {
            data.push({ title: 'Forums', data: sectionData });
        }

        // Extract the threads~
        const threads = root.querySelectorAll('.structItem.structItem--thread.js-inlineModContainer')
        for (const thread of threads) {
            const titles = thread.querySelectorAll('.structItem-title >a') 
            const label = titles.length > 1 ? titles[0]?.text.trim()+' ' : ''
            const title = titles[titles.length > 1 ? 1 : 0]?.text.trim()
            const username_started = thread.querySelector('.structItem-parts >li')?.text.trim() ?? ""
            const thread_started = thread.querySelector('.structItem-startDate >a')?.text.trim() ?? ""
            const replies_count = thread.querySelector('.pairs.pairs--justified >dd')?.text.toString() ?? ""
            const last_time_replies = thread.querySelector('.structItem-cell.structItem-cell--latest >a')?.text.trim() ?? ""
            const last_time_username_replies = thread.querySelector('.structItem-cell.structItem-cell--latest >div')?.text.trim() ?? ""
            const is_sticky = thread.querySelector('.structItem-status.structItem-status--sticky') ? true : false
            const link = thread.querySelector('.structItem-title >a')?.getAttribute('href') ?? '' 
            threaditem.push({
                title,
                label,
                username_started,
                thread_started,
                replies_count,
                last_time_replies,
                last_time_username_replies,
                is_sticky,
                link,
                is_thread,
            })
        }

        data.push({ title: 'Forums', data: threaditem });
        return data
    } catch (error) {
        console.error("Error fetching subitem:", error);
        throw new Error("Failed to fetch subitem data");
    }
}


export default fetchHomePage;  // Default export
export { fetchSubitem };  // Named export
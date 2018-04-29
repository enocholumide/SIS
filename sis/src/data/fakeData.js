export default fakedata = [

    {
        key: 'exams',
        data: [
            {
                course_id: 'GMCM 550',
                title: 'GIS Programming',
                date: '2018-09-25',
                from: '05:30',
                to: '06:30',
                location: 'ETF Building Room 864',
                note: 'No laptops allowed, bring only writing materials'
            },

            {
                course_id: 'GMCM 534',
                title: 'Statistics and Reference System',
                date: '2018-09-25',
                from: '02:30',
                to: '03:30',
                location: 'Engineering Building Room 204',
                note: 'Non-programmable calulators and writing materials are allowed'
            },

            {
                course_id: 'GMCM 530',
                title: 'Geomarketing Techniques',
                date: '2018-09-15',
                from: '05:30',
                to: '06:30',
                location: 'ETF Building Room 864',
                note: 'Bring only writing materials'
            }
        ]
    },

    {
        key: 'people',
        data: [
            {
                id: 0,
                title: 'Prof. Dr.',
                name: {
                    first: 'Muller',
                    last: 'Jenks'
                },
                thumbnailUrl: 'https://images.pexels.com/photos/428341/pexels-photo-428341.jpeg?auto=compress&cs=tinysrgb&h=350',
                department: 'Faculty of Engineering',
                phone: '0484871148115',
                email: 'hognpeters@schoolEngineering.com',
                location: 'Engineering Building, Room 245',
                office_hours: 'Mon-Thurs 8am-5pm, Fri 8am-2pm'
            },
            {
                id: 1,
                title: 'Prof. Dr.',
                name: {
                    first: 'Amy',
                    last: 'Sandra'
                },
                thumbnailUrl: 'https://amp.businessinsider.com/images/59bae2cd38d20d2a008b6447-750-563.jpg',
                department: 'Student Affairs',
                phone: '0548451547841',
                email: 'sandarakol@schoolSenate.com',
                location: 'Senate Building, Room 014, ',
                office_hours: 'Mon-Tue 8am-5pm, Fri 8am-5pm'
            },
        ]
    },

    {
        key: 'feeds',
        data: [
            {
                id: 0,
                title: "Main Library Study Room are Now Open 24 Hours",
                body: "All Areas of the Main Library Study Room are Now Open 24 Hours. From now on, all areas of the Main Library Study Room are open 24 hours. Laptop use is allowed in Area A, but banned in Area B and C. ",
                thumbnailUrl: "http://radioilijas.ba/wp-content/uploads/2016/04/books-in-home-library.jpg",
                created_at: '2018-04-25T18:39:20.526Z',
                category: 'Architecture'
            },
            {
                id: 1,
                title: "New Clinic Instructor Mrs. Wisnieski, BSN, RN. says Hello!",
                body: "Mrs. Wisnieski, BSN, RN. Hello! I am very proud to be the School Nurse at Reagan Middle School since it opened in 2012. I have been a nurse 20 plus years. The majority of my career has been in pediatrics. This is my sixth year as a school nurse in PWCS, and my fourth year as the Reagan Middle",
                thumbnailUrl: "https://www.binghamton.edu/news/images/uploads/features/BaidooDavisDeshler.jpg",
                created_at: '2018-04-25T18:32:14.780Z',
                category: 'Health'
            }
        ]
    },

    {
        key: 'feeds_categories',
        data: {
            "122": "Architecture",
            "123": "Computer Science",
            "124": "Surveying",
            "125": "Urban and Regional Planning",
            "126": "Health"
        }
    }


]